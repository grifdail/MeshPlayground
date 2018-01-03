import React from "react";
import {PIN_HEIGHT, NODE_WIDTH} from "../StyleConstant.js";
import {Group} from './Group.js';

export function Params({ index, children}) {
  return <Group x={0} y={index*PIN_HEIGHT} className="field">
    <foreignObject width={NODE_WIDTH} height={PIN_HEIGHT}>
      {children}
    </foreignObject>
  </Group>
}
