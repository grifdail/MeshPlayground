import {FragmentShader, DefaultVertexShader, DefaultFragmentShader} from "./templateShader.js";
import {pick} from "ramda";

import { solve } from '../lib/dependency-solver.js';
import {__, prop, map, join, curry, compose, pluck, uniq } from 'ramda';

function removeLonelyNode(simplifiedGraph, source) {
  let requiredNodes = [source];
  let nextNodes = [source];
  let currentNode
  while((currentNode = nextNodes.pop())) {  // eslint-disable-line
    const dependencies = simplifiedGraph[currentNode] || [];
    dependencies.forEach(name => {
      if(requiredNodes.indexOf(name) < 0) {
        requiredNodes.push(name);
        nextNodes.push(name);
      }
    });
  }
  return pick(requiredNodes, simplifiedGraph);
}

function prepareGraphData(graph, models) {
  const newNodes = graph.nodes.reduce((old, n) => {
    old[n.name] = n;
    n.inputsPin = {};
    return old;
  }, {});
  let simplifiedGraph = {"output": []};
  graph.edges.forEach(edge => {
    const to = edge.to.node;
    const from = edge.from.node;
    simplifiedGraph[to] = simplifiedGraph[to] || [];
    simplifiedGraph[from] = simplifiedGraph[from] || [];
    simplifiedGraph[to].push(edge.from.node);
    newNodes[to].inputsPin[edge.to.input] = toPinName(edge.from.node, edge.from.output);
  });
  simplifiedGraph = removeLonelyNode(simplifiedGraph, "output");
  return {newNodes, simplifiedGraph};
}

const getCodeForNode = curry((models, node) => {
  var model = models[node.type];
  var inputs = node.inputsPin;
  var params = node.params;
  var outputs = model.outputs.reduce((old, output) => {
    old[output.name] = toPinName(node.name, output.name);
    return old;
  }, {});
  return {
    main:  model.toGLSL(inputs, params, outputs, node.inputsTypes),
    uniforms:  model.requireUniform(inputs, params, outputs, node.inputsTypes)
  };
})

function toPinName(node, pin) {
  return node.replace("_","")+"_"+pin.replace("_","");
}

export function calculateShader(graph, models) {
  const {newNodes, simplifiedGraph} = prepareGraphData(graph, models);
  if(Object.keys(simplifiedGraph).length<=1) {
    return {
      fragment: DefaultFragmentShader,
      vertex: DefaultVertexShader
    };
  }
  var order = solve(simplifiedGraph);

  const codeFragments = map(compose(
    getCodeForNode(models),
    prop(__, newNodes)
  ), order);

  const code = {
    main : join("\n", pluck("main", codeFragments)),
    uniforms : join("\n", uniq(pluck("uniforms", codeFragments))),
  }

  console.log( FragmentShader(code));
  return {
    fragment: FragmentShader(code),
    vertex: DefaultVertexShader
  };
}
