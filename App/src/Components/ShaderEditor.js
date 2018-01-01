import React, {Component} from 'react';
import {ShaderEditor, GraphState, EditorState} from '../lib/shader-editor';
import { Icon } from 'semantic-ui-react';



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
    const className = `code-editor ${this.props.minized ? "minimized" : ""}`
    return (
      <div className={className}>
        <ShaderEditor
          graph={this.state.graph}
          editor={this.state.editor}
          onGraphChange={this.onGraphChange}
          onEditorChange={this.onEditorChange}
          onShaderChange={this.props.onShaderChange}
        />
        <div className="icon-minimize" onClick={this.props.onToogle}>
          <Icon name="toggle left" />
        </div>
      </div>
    );
  }
}


export default Editor;
