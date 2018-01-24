import React, {Component} from 'react';
import {ShaderEditor, GraphState, EditorState} from '../lib/shader-editor';



/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state= {
      editor: new EditorState()
    }
  }


  onEditorChange = newState => {
    this.setState({editor: newState});
  }

  onShaderChange = (shader, graph) => {
    console.log("onShaderChange "+graph.data.nodes.length);
    this.props.onShaderChange(shader, graph.data);
  }

  render() {
    return (
      <div className="code-editor">
        <ShaderEditor
          graph={new GraphState(this.props.graphData)}
          editor={this.state.editor}
          onGraphChange={graph => this.props.onGraphChange(graph.data)}
          onEditorChange={this.onEditorChange}
          onShaderChange={this.onShaderChange}
        />
      </div>
    );
  }
}


export default Editor;
