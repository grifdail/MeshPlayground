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
  var totalContentCount = pinCount+model.params.length
  var totalContentHeight = totalContentCount * PIN_HEIGHT;
  var totalHeight = totalContentHeight + HEADER_HEIGHT;
  return (
    <Group className="node" x={node.position.x} y={node.position.y}>
      <rect className="root" width={NODE_WIDTH} height={totalHeight}/>
      <Group onMouseDownCapture={dragOn} onMouseUpCapture={onRelease}>
        <rect className="header" width={NODE_WIDTH} height={HEADER_HEIGHT}/>
        <text textAnchor="middle" x={NODE_WIDTH*0.5} y ={HEADER_HEIGHT*0.5} alignmentBaseline="middle">{model.name}</text>
      </Group>
      <Group className="body" className="node" y={HEADER_HEIGHT}>
        <Group className="pingroup inputs">
          {
            model.inputs.map((input,i) => <Pin  key={i}  type={input.type} kind="input" index={i} onClick={mouseDown(events, node.name, input.name, null) }>{input.name} </Pin>)
          }
        </Group>
        <Group className="pingroup outputs">
          {
            model.outputs.map((output,i) => <Pin key={i} type={output.type} kind="output" index={i} onClick={mouseDown(events, node.name, null, output.name)}>{output.name}</Pin>)
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

/*

<foreignObject x={node.position.x} y={node.position.y} height={totalHeight * PIN_HEIGHT + HEADER_HEIGHT} width={NODE_WIDTH} >
<div className="node" height={totalHeight * PIN_HEIGHT + HEADER_HEIGHT}>
  <div className="header" style={{height: HEADER_HEIGHT, width:NODE_WIDTH}} onMouseDownCapture={dragOn} onMouseUpCapture={onRelease}>
    {model.name}
  </div>
  <div className="body" style={{height:totalHeight*PIN_HEIGHT}}>
    <div className="inputs">
      {
        model.inputs.map((input,i) => <Pin type={input.type} index={i} onClick={mouseDown(events, node.name, input.name, null) }>{input.name} </Pin>)
      }
    </div>
    <div className="outputs">
      {
        model.outputs.map((output,i) => <Pin type={output.type} index={i} onClick={mouseDown(events, node.name, null, output.name)}>{output.name}</Pin>)
      }
    </div>
    <div className="params">
      {
        model.params.map(({name, type},i) => {
          var Component = fields[type];
          return <div className="field" style={{transform: `translate(0, ${(pinCount+i)*PIN_HEIGHT}px)`}}><Component id={i} onChange={updateNodeParams(name)} value={node.params[name]} name={name} /></div>
        })
      }
    </div>
  </div>

</div>
</foreignObject>

*/
