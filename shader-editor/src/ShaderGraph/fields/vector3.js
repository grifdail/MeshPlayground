import React from "react";
import {assoc} from "ramda";
import './vector3.css';

function toString(v) {

  return Math.abs(v%1)<0.001 ? v.toFixed(1) : v;
}

export const fields = ({onChange, value, name}) => {
  const events = type => e => {
    const newObj = assoc(type, parseFloat(e.target.value), value);
    onChange(newObj);
  }


  return(<div className="vector3">
    <span className="label">{name}</span>
    <div className="inputs">
      <input onChange={events("x")} placeholder="x" value={toString(value.x)} />
      <input onChange={events("y")} placeholder="y" value={toString(value.y)} />
      <input onChange={events("z")} placeholder="z" value={toString(value.z)} />
    </div>

  </div>)
}

export default fields;
