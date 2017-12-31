var { solve } = require('dependency-solver');
var { __, prop, map, join, curry, compose, pluck } = require('ramda');


function prepareGraphData(graph, models) {
  const newNodes = graph.nodes.reduce((old, n) => {
    old[n.name] = n;
    n.inputsPin = {};
    return old;
  }, {});
  const simplifiedGraph = {};
  graph.edges.forEach(edge => {
    const from = edge.from.node;
    const to = edge.to.node;
    simplifiedGraph[to] = simplifiedGraph[to] || [];
    simplifiedGraph[to].push(edge.from.node);
    newNodes[to].inputsPin[edge.to.input] = toPinName(edge.from.node, edge.from.output);
  });
  return {newNodes, simplifiedGraph};
}

const getCodeForNode = curry((models, node) => {
  var model = models[node.type];
  console.log(models, node.type, model);

  var inputs = node.inputsPin;
  var params = node.params;
  var outputs = model.outputs.reduce((old, output) => {
    old[output.name] = toPinName(node.name, output.name);
    return old;
  }, {});
  return {
    main:  model.toGLSL(inputs, params, outputs),
    uniforms:  model.requireUniform(inputs, params, outputs)
  };
})

function toPinName(node, pin) {
  return node.replace("_","")+"_"+pin.replace("_","");
}

export function calculateShader(graph, models) {
  const {newNodes, simplifiedGraph} = prepareGraphData(graph, models);
  var order = solve(simplifiedGraph);
  if(!order.length) {
    return "";
  }

  const codeFragments = map(compose(
    getCodeForNode(models),
    prop(__, newNodes)
  ), order);

  const code = {
    main : join(";\n", pluck("main", codeFragments)),
    uniforms : join(";\n", pluck("uniforms", codeFragments)),
  }

  return {
    fragment: FragmentShader(code),
    VertexShader: DefaultVertexShader
  };
}
