import React, {Component} from 'react';
import {ShaderEditor, GraphState, EditorState} from '../lib/shader-editor';



/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';

class Editor extends Component {
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
    return (
      <div className="code-editor">
        <ShaderEditor
          graph={this.state.graph}
          editor={this.state.editor}
          onGraphChange={this.onGraphChange}
          onEditorChange={this.onEditorChange}
          onShaderChange={this.props.onShaderChange}
        />
      </div>
    );
  }
}


export default Editor;
