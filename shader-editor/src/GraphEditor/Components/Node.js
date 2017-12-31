import React from 'react';
import "./Node.css"
import {Pin} from "./Pin.js";
import {HEADER_HEIGHT, NODE_WIDTH, PIN_HEIGHT} from "../StyleConstant.js"

var mouseDown = (events, name, input, output) => e => {

  e.stopPropagation();
  e.preventDefault();
  e.nativeEvent.stopImmediatePropagation();
  e.nativeEvent.preventDefault();
  e.nativeEvent.stopPropagation();
  events.onClickPin(name, input, output);
}


export function Node({node, model, events, mouseHelper, fields}) {
  const dragOn = e => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.preventDefault();
    events.onStartDragNode(node.name, mouseHelper(e))
  };
  const onRelease = e => {

    e.preventDefault();
    e.stopPropagation();
    events.onEndDragNode();
    if (e.ctrlKey) {
      events.onRemoveNode(node.name);
    }
  };
  const updateNodeParams = type => e => {
    events.updateNodeParams(node.name, type, e)
  }
  var pinCount = Math.max(model.inputs.length, model.outputs.length);
  var totalHeight = pinCount+model.params.length
  return (
    <foreignObject x={node.position.x} y={node.position.y} height={totalHeight} width={NODE_WIDTH} >
    <div className="node" height={totalHeight}>
      <div className="header" style={{height: HEADER_HEIGHT, width:NODE_WIDTH}} onMouseDownCapture={dragOn} onMouseUpCapture={onRelease}>
        {model.name}
      </div>
      <div className="body" style={{height:totalHeight*PIN_HEIGHT}}>
        <div className="inputs">
          {
            model.inputs.map((input,i) => <Pin type={input.type} index={i} onClickCapture={mouseDown(events, node.name, input.name, null) }>{input.name} </Pin>)
          }
        </div>
        <div className="outputs">
          {
            model.outputs.map((output,i) => <Pin type={output.type} index={i} onClickCapture={mouseDown(events, node.name, null, output.name)}>{output.name}</Pin>)
          }
        </div>
        <div className="params">
          {
            model.params.map(({name, type},i) => {
              var Component = fields[type];
              return <div className="field" style={{top: (pinCount+i)*PIN_HEIGHT}}><Component id={i} onChange={updateNodeParams(name)} value={node.params[name]} name={name} /></div>
            })
          }
        </div>
      </div>

    </div>
  </foreignObject>
  )
}
