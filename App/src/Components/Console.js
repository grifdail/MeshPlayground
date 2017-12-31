import React from "react";
import { Message } from 'semantic-ui-react';
import StackTracey  from '../lib/stacktracey';

const parseError = err => ({message: err.message, stack: new StackTracey(err)});

const Log = ({type, message, isLast}) => {
  if(type==="error") {
    const error = typeof message.stack === "string" ? parseError(message)  : message;
    const lineNumber = error.stack[0].line - 2;
    const content = lineNumber >-1 ? `line ${lineNumber}` : null;
    return <Message icon="warning" error header={message.message} content={content} attached/>
  } else {
    return <Message content={message && message.toString()} attached />
  }

}

const Console = ({messages}) => (
  <div className="console">
    {
      messages.map((message, i) => <Log {...message} isLast={i<messages.length-1} key={i}/>)
    }
  </div>
)

export default Console;
