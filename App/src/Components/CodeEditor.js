import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github'

/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';

function CodeEditor(props) {
  return (
    <div className="code-editor">
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
    </div>

  );
}

export default CodeEditor;
