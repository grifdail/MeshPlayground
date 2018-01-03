import React from "react";
import './number.css';
import {NumberInput} from '../utils.js';


export const fields = ({onChange, value, name}) => (<div className="number">
  <span className="label">{name}</span>
  <NumberInput onChange={onChange} value={value}/>
</div>)

export default fields;
