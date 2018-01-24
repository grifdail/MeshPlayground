import React, {Component} from "react";
import "./css/Editor.css";
import CodeEditor from './CodeEditor.js'
import ShaderEditor from './ShaderEditor.js'
import Preview from './Preview.js'
import Console from './Console.js'
import Mousetrap from 'mousetrap'
import Tabs from './EditorTab.js'

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      fontSize: 12
    }
  }
  zoomDir = value => () => {
    this.setState(s => ({fontSize: Math.min(Math.max(5, s.fontSize + value),30)}))
    return false;
  };
  componentDidUpdate() {
    this.refs.preview.resize();
  }
  componentDidMount() {
    Mousetrap.bind("ctrl+plus", this.zoomDir(1))
    Mousetrap.bind("ctrl+-", this.zoomDir(-1))
  }
  componentWillUnmount() {
    Mousetrap.unbind("ctrl+plus", this.zoomDir(1))
    Mousetrap.unbind("ctrl+-", this.zoomDir(-1))
  }

  render() {
    const props = this.props;
    return (
      <div className="editor">
        <Tabs windowNeedResize={() => this.refs.preview.resize()}>
          <CodeEditor
            value={props.currentCode}
            onChange={props.reducer.updateCode}
            fontSize={this.state.fontSize}
          />
          <ShaderEditor
            onShaderChange={props.reducer.updateShader}
            onGraphChange={props.reducer.updateShaderGraph}
            graphData={props.shaderGraph}
          />
        </Tabs>

        <Preview {...props} ref="preview"/>
        <Console messages={props.console} />

      </div>
    )
  }
}



export default Editor;
