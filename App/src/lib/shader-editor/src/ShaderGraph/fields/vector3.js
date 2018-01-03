import React from "react";
import {assoc} from "ramda";
import './vector3.css';
import {NumberInput} from '../utils.js';



export const fields = ({onChange, value, name}) => {
  const events = type => e => {
    const newObj = assoc(type, e, value);
    onChange(newObj);
  }


  return(<div className="vector3">
    <span className="label">{name}</span>
    <div className="inputs">
      <NumberInput onChange={events("x")} placeholder="x" value={value.x} />
      <NumberInput onChange={events("y")} placeholder="y" value={value.y} />
      <NumberInput onChange={events("z")} placeholder="z" value={value.z} />
    </div>

  </div>)
}

export default fields;
