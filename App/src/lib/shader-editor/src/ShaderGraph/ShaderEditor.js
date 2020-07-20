import React, {Component} from "react";
import {none, propEq, map, prop} from "ramda";
import {models} from "./models/index.js";
import {fields} from "./fields/index.js";
import { GraphEditor } from '../GraphEditor/Components/GraphEditor.js';
import { calculateShader } from './graphToShader.js';
import colorByType from './typeColor.js';


export class ShaderEditor extends Component {
  constructor(props) {
    super(props);
    const nodes = props.graph.data.nodes;
    if (none(propEq("name", "output"), nodes)) {
      props.onGraphChange(props.graph.createNodeNamed("output", {x:100,y:100}, models["Output"]));
    }
  }
  oldShader = {};
  onGraphChange = (newGraph) => {
    this.props.onGraphChange(newGraph);
    const newShader = calculateShader(newGraph.data, models);
    if (newShader.fragment !== this.oldShader.fragment) {
      this.oldShader = newShader;
      this.props.onShaderChange(newShader, newGraph);
    }

  }
  render() {
    return <GraphEditor
      graph={this.props.graph}
      editor={this.props.editor}
      models={models}
      fields={fields}
      onGraphChange={this.onGraphChange}
      onEditorChange={this.props.onEditorChange}
      colorByType={colorByType}
     />
  }

}

export {calculateShader};