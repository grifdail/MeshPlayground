import React from "react";
import './number.css';

export const fields = ({onChange, value, name}) => (<div className="number">
  <span className="label">{name}</span>
  <input onChange={e => onChange(parseFloat(e.target.value))} value={value}/>
</div>)

export default fields;
