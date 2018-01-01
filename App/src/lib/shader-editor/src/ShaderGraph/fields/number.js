import React from "react";
import './number.css';

function toString(v) {

  return Math.abs(v%1)<0.001 ? v.toFixed(1) : v;
}

export const fields = ({onChange, value, name}) => (<div className="number">
  <span className="label">{name}</span>
  <input onChange={e => onChange(parseFloat(e.target.value))} value={toString(value)}/>
</div>)

export default fields;
