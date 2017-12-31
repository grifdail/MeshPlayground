import React from 'react';
const MinCurveDistance = 200;


export function Edge({name, from, to, color, events}) {
  var delta = (to.x-from.x);
  var midpoint = (from.x+to.x)/2
  var halfX = - Math.max(Math.abs(delta),MinCurveDistance)/2;
  var string =  delta > MinCurveDistance ? `M${from.x},${from.y} C${midpoint},${from.y} ${midpoint},${to.y} ${to.x},${to.y}`:
      `M${from.x},${from.y} C${from.x-halfX},${from.y} ${to.x+halfX},${to.y} ${to.x},${to.y}`;
  var onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.ctrlKey) {
      events.onRemoveEdge(name)
    }
  }

  return (<path d={string} stroke={color} stroke-width="10" fill="none" onClick={onClick}/>);
}
