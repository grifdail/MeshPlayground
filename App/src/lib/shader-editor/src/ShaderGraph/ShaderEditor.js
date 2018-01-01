import React, {Component} from "react";
import {none, propEq} from "ramda";
import {models} from "./models/index.js";
import {fields} from "./fields/index.js";
import { GraphEditor } from '../GraphEditor/Components/GraphEditor.js';
import { calculateShader } from './graphToShader.js';


export class ShaderEditor extends Component {
  constructor(props) {
    super(props);
    const nodes = props.graph.data.nodes;

    if (none(propEq("name", "Output"), nodes)) {
      props.onGraphChange(props.graph.createNodeNamed("output", {x:100,y:100}, models["Output"]));
    }
  }

  updateShader = () => {

  }
  onGraphChange = (newGraph) => {
    this.props.onGraphChange(newGraph);
    this.props.onShaderChange(calculateShader(newGraph.data, models));
  }
  render() {
    return <GraphEditor
      graph={this.props.graph}
      editor={this.props.editor}
      models={models}
      fields={fields}
      onGraphChange={this.onGraphChange}
      onEditorChange={this.props.onEditorChange}
     />
  }

}
