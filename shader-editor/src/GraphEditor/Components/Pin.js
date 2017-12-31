import React from "react";
import "./Pin.css";
import {PIN_HEIGHT} from "../StyleConstant.js";

export function Pin({children, type,index, ...props}) {
    return <div className={"pin "+type} style={{top: index*PIN_HEIGHT+"px"}} {...props}>
      <span className="label">{children}</span>
      <span className="display"></span>
    </div>
}
