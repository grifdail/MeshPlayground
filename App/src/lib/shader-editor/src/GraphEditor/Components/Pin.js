import React from "react";
import {PIN_HEIGHT, NODE_WIDTH} from "../StyleConstant.js";
import {Group} from "./Group.js";

function OutputPin({children, type,index, ...props}) {
  return <Group y={index*PIN_HEIGHT} {...props}>
    <circle fill="white" cx={NODE_WIDTH} cy={PIN_HEIGHT * 0.5} r={PIN_HEIGHT*0.3}/>
    <text textAnchor="end" x={NODE_WIDTH - PIN_HEIGHT*0.5} y={PIN_HEIGHT*0.5} alignmentBaseline="middle">{children}</text>
  </Group>
}

function InputPin({children, type,index, ...props}) {
  return <Group y={index*PIN_HEIGHT} {...props}>
    <circle fill="white" cx={0} cy={PIN_HEIGHT * 0.5} r={PIN_HEIGHT*0.3}/>
    <text textAnchor="start" x={PIN_HEIGHT*0.5} y ={PIN_HEIGHT*0.5} alignmentBaseline="middle">{children}</text>
  </Group>
}

export function Pin({kind, ...props}) {
  return kind==="input" ? <InputPin {...props} /> : <OutputPin {...props}/>
}
