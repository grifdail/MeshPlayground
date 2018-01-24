import React from 'react';

export function Group({children, x=0, y=0, scaleX=1, scaleY=1, ...props}) {
  return <g transform={` scale(${scaleX}, ${scaleY}) translate(${x}, ${y})`} {...props}>
    {children}
  </g>
}
