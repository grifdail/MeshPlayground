import {mergeWith, add, compose, append, reject,
  pathEq, curry, reduce, forEach, assocPath,
  equals, differenceWith, pipe,
  both, path, find, any, propEq} from "ramda";
import {updateWhere, updateProp, randomNodeName, hasPropInList } from "../utils.js";

const updateNodes = updateProp('nodes');
const updateEdges = updateProp('edges');
const whereName = pathEq(['name']);
const updateNamed = curry((name, fn, data) => updateWhere(whereName(name), fn, data));

const createInitialData = () => ({
  nodes: [],
  edges: []
})

export class GraphState {
  constructor(data = null) {
    if (!data) {
      data = createInitialData();
    }
    this.data = data;
  }

  updateNodePosition(delta, targetedNodes) {
    return new GraphState(
      updateProp('nodes', updateWhere(hasPropInList('name',targetedNodes), updateProp('position', mergeWith(add, delta))), this.data)
    );
  }

  updateNodeParams(nodeName, paramsName, value, models) {
    return new GraphState(
      updateNodes(updateNamed(nodeName, assocPath(["params", paramsName], value)), this.data)
    )
  }

  createEdge(newNode, oldNode, models, colorByType) {
    if ((newNode.input && oldNode.input) || (newNode.output && oldNode.output)) {
      return this;
    }
    var leftNode = oldNode.input ? newNode : oldNode;
    var rightNode = oldNode.input ? oldNode : newNode;
    const leftNodeObj = find(whereName(leftNode.node), this.data.nodes);

    const types = models[leftNodeObj.type].getOutputType(leftNodeObj.inputsTypes, leftNodeObj.params);
    const newType = find(whereName(leftNode.output),types);
    var newEdge = {from: leftNode, to:rightNode, color:colorByType[newType.type] || 'red', name:randomNodeName(25)}
    return  new GraphState(
      updateEdges(compose(
        append(newEdge),
        reject(pathEq(["to"], rightNode))
      ), this.data)
    ).updateNodesTypes(assocPath(["inputsTypes", rightNode.input], newType.type), rightNode.node, models);
  }



  createNode(position, model) {
    return this.createNodeNamed(randomNodeName(), position, model)
  }

  createNodeNamed(name, position, model) {
    const params = reduce((old,n) => {
      old[n.name] = n.default;
      return old;
    }, {}, model.params);
    const inputsTypes = reduce((old,n) => {
      old[n.name] = n.type.split('|')[0];
      return old;
    }, {}, model.inputs);
    var nodeObj = {
      name: name,
      type: model.name,
      model,
      position,
      params,
      inputsTypes,
    }
    return new GraphState(updateProp('nodes', append(nodeObj), this.data));
  }

  removeEdge(name) {

    return new GraphState(updateEdges(reject(whereName(name)), this.data));
  }


  updateNodesTypes(updateNode, nodeName, models) {
    var nodeToDestroy = null;

    return new GraphState(pipe(
        updateNodes(updateWhere(whereName(nodeName), node => {

          const model = models[node.type];
          const oldOutput = model.getOutputType(node.inputsTypes, node.params);

          const newNode = updateNode(node);
          const newOutput = model.getOutputType(newNode.inputsTypes, newNode.params);
          nodeToDestroy = differenceWith(equals, newOutput, oldOutput);

          return newNode;

        })),
        updateEdges(reject(both(pathEq(["from", "node"], nodeName), pipe(path(["from", "output"]), a => any(propEq("name", a), nodeToDestroy)))))
    )(this.data));
  }

  removeNode(name) {
    return new GraphState(compose(
      updateNodes(reject(whereName(name))),
      updateEdges(reject(v => (pathEq(["from", "node"], name, v) || pathEq(["to", "node"], name, v))))
    )(this.data));
  }

}


forEach((name) => {
  GraphState[name] = (...args) => ({name, args});
}, Object.getOwnPropertyNames(GraphState.prototype))
