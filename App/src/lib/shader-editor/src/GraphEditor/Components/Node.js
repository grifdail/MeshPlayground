import React from 'react';
import "./Node.css"
import {Pin} from "./Pin.js";
import {Group} from "./Group.js";
import {Params} from "./Params.js";
import {HEADER_HEIGHT, NODE_WIDTH, PIN_HEIGHT} from "../StyleConstant.js"

var mouseDown = (events, name, input, output) => e => {

  e.stopPropagation();
  e.preventDefault();
  e.nativeEvent.stopImmediatePropagation();
  e.nativeEvent.preventDefault();
  e.nativeEvent.stopPropagation();
  events.onClickPin(name, input, output);
}


export function Node({node, model, events, mouseHelper, fields, colorByType}) {
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
  const outputs = model.getOutputType(node.inputsTypes, node.params);
  var pinCount = Math.max(model.inputs.length, outputs.length);
  var totalContentCount = pinCount+model.params.length
  var totalContentHeight = totalContentCount * PIN_HEIGHT;
  var totalHeight = totalContentHeight + HEADER_HEIGHT;
  return (
    <Group className="node" x={node.position.x} y={node.position.y}>
      <rect className="root" width={NODE_WIDTH} height={totalHeight}/>
      <Group onMouseDownCapture={dragOn} onMouseUpCapture={onRelease}>
        <rect className="header" width={NODE_WIDTH-2} height={HEADER_HEIGHT-2} x="1" y="1"/>
        <text textAnchor="middle" x={NODE_WIDTH*0.5} y ={HEADER_HEIGHT*0.5} alignmentBaseline="middle">{model.name}</text>
      </Group>
      <Group className="body" y={HEADER_HEIGHT}>
        <Group className="pingroup inputs">
          {
            model.inputs.map((input,i) => <Pin
              key={i}
              type={node.inputsTypes[input.name]}
              kind="input"
              index={i}
              onClick={mouseDown(events, node.name, input.name, null) }
              colorByType={colorByType}
            >{input.name} </Pin>)
          }
        </Group>
        <Group className="pingroup outputs">
          {
            outputs.map((output,i) => <Pin key={i}   colorByType={colorByType} type={output.type} kind="output" index={i} onClick={mouseDown(events, node.name, null, output.name)}>{output.name}</Pin>)
          }
        </Group>
        <Group x={0} y={pinCount*PIN_HEIGHT}>
          {
            model.params.map(({name, type},i) => {
              var Component = fields[type];
              return <Params index={i} key={i}>
                <Component id={i} onChange={updateNodeParams(name)} value={node.params[name]} name={name} />
              </Params>
            })
          }
        </Group>
      </Group>

    </Group>

  )
}
