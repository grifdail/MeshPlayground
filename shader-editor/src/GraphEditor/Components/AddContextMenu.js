import { ContextMenu as RContextMenu, SubMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { groupBy,  prop, values, mapObjIndexed, map } from "ramda";
import React from 'react';
import './ContextMenu.css';

export function AddContextMenu({id, models, createAddNode}) {
  var categories = groupBy(prop("category"), values(models));
  return (
    <RContextMenu id={id}>
      {values(mapObjIndexed((category, name) => (
        <SubMenu title={name}>
          {map(model => <MenuItem onClick={createAddNode(model.name)}>{model.name}</MenuItem>, category)}
        </SubMenu>),categories))}
    </RContextMenu>
  )
}
