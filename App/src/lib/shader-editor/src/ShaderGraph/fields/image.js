import React from "react";
import './number.css';


export const fields = ({onChange, value, name}) => (<div className="number">
  <span className="label">{name}</span>
  <select onChange={(e) => onChange(e.target.value)} value={value}>
    <option value="image1">MainTexture</option>
  </select>
</div>)

export default fields;
