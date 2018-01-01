import {mergeWith, add, compose, append, reject, pathEq, curry, reduce, forEach, assocPath} from "ramda";
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

  updateNodeParams(nodeName, paramsName, value, state) {
    return new GraphState(
      updateNodes(updateNamed(nodeName, assocPath(["params", paramsName], value)), this.data)
    )
  }

  createEdge(newNode, oldNode) {
    if ((newNode.input && oldNode.input) || (newNode.output && oldNode.output)) {
      return this;
    }
    var leftNode = oldNode.input ? newNode : oldNode;
    var rightNode = oldNode.input ? oldNode : newNode;
    var newEdge = {from: leftNode, to:rightNode, color:"red", name:randomNodeName(25)}
    return  new GraphState(
      updateEdges(compose(
        append(newEdge),
        reject(pathEq(["to"], rightNode))
      ), this.data)
    );
  }

  createNode(position, model) {
    return this.createNodeNamed(randomNodeName(), position, model)
  }

  createNodeNamed(name, position, model) {
    const params = reduce((old,n) => {
      old[n.name] = n.default;
      return old;
    }, {}, model.params);
    var nodeObj = {
      name: name,
      type: model.name,
      position,
      params
    }
    return new GraphState(updateProp('nodes', append(nodeObj), this.data));
  }

  removeEdge(name) {
    return new GraphState(updateEdges(reject(whereName(name)), this.data));
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
