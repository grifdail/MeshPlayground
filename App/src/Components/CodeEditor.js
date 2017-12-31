import React from 'react';
import AceEditor from 'react-ace';
import { Icon } from 'semantic-ui-react';

import 'brace/mode/javascript';
import 'brace/theme/github'

/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';

function CodeEditor(props) {
  const className = `code-editor ${props.minized ? "minimized" : ""}`
  return (
    <div className={className}>
      <AceEditor
        mode="javascript"
        theme="github"
        value={props.value}
        onChange={props.onChange}
        height="100%"
        width="100%"
        name="CodeEditor"
        fontSize={props.fontSize || 12}
        editorProps={{$blockScrolling: true}}
      />
      <div className="icon-minimize" onClick={props.onToogle}>
        <Icon name="toggle left" />
      </div>
    </div>

  );
}

export default CodeEditor;
