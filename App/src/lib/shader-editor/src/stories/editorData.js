import {mergeWith, add, compose, append, reject, pathEq, curry, assoc, empty, reduce} from "ramda";
import React, {Component} from 'react';

var addNodeModel = {
  outputs: [
    {name: "value", type: "number"}
  ],
  name:"add",
  category: "math",
  inputs: [{name: "A", type: "number"},{name:"B", type:"number"}],
  params: [],
  toString: (inputs, params, outputs) => {
    return `float ${outputs.value} = ${inputs.A} + ${inputs.B};`;
  }
}
var minusNodeModel = {
  outputs: [
    {name: "value", type: "number"}
  ],
  name:"minus",
  category: "math",
  inputs: [{name: "A", type: "number"},{name:"B", type:"number"}],
  params: [],
  toString: (inputs, params, outputs) => {
    return `float ${outputs.value} = ${inputs.A} - ${inputs.B};`;
  }
}

var numberNodeModel = {
  outputs: [
    {name: "value", type: "number"}
  ],
  name:"number",
  category: "const",
  inputs: [],
  params: [{name: "value", type:"number", default: 0}],

  toString: (inputs, params, outputs) => {
    return `float ${outputs.value} = ${params.value}`;
  }
}


var addNodeData = {
  id: "1",
  position: {x: 25, y:25},
  type: "add",
}
var nodes = [
  addNodeData,
  {
    id: "2",
    position: {x: 425, y:125},
    type: "add",
  }
]


export var models = reduce((old, node)=>assoc(node.name, node, old), {}, [
  numberNodeModel,
  minusNodeModel,
  addNodeModel
])

export const fields = {
  number: ({onChange, value, name}) => (<div>
    <span className="label">{name}</span>
    <input onChange={onChange} value={value}/>
  </div>)
}
