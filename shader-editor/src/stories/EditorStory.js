import React, {Component} from 'react';
import { ShaderEditor } from '../ShaderGraph/ShaderEditor.js';
import { GraphState } from '../GraphEditor/State/GraphState.js';
import { EditorState } from '../GraphEditor/State/EditorState.js';

export class EditorStory  extends Component {
  state= {
    graph: new GraphState(),
    editor: new EditorState()
  }
  onGraphChange = newState => {
    this.setState({graph: newState});
  }
  onEditorChange = newState => {
    this.setState({editor: newState});
  }
  render() {
    return <ShaderEditor
      graph={this.state.graph}
      editor={this.state.editor}
      onGraphChange={this.onGraphChange}
      onEditorChange={this.onEditorChange}
      onShaderChange={this.props.onShaderChange}
    />
  }
}
