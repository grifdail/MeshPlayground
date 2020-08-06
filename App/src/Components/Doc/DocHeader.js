import React, {Component} from 'react'
import { Grid , List, Header} from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller';
import FunctionDefinition from './FunctionDefinition.js';
import ClassDefinition from './ClassDefinition.js';
import ObjectDefinition from './ObjectDefinition.js';
import ConstantDefinition from './ConstantDefinition.js';
import {ColorDefinition, ColorPaletteDefinition} from './ColorDefinition.js';
import {getIconForItem} from "./utils.js";


function groupContent(content) {
  return content.reduce((acc, item) => {
    if (item.tags && item.tags.length>0) {
      var a = item.tags[0];
      if (!acc[a]) {
        acc[a] = [];
      } 
      acc[a].push(item);
    } else {
      acc.misc.push(item);
    }
    return acc;
  }, {misc:[]});
}

function DocHeader({content, onSelect}) {
  var groups = groupContent(content);
  var pair = Object.entries(groups);
  return <Grid columns={4} >
   {
     pair.map(([key, list]) => {
        return <Grid.Column>
          <Header as='h6'>{key}</Header>
          <List>
            {
              list.map(item => {
                return (<List.Item>
                  <List.Icon name={getIconForItem(item)} />
                  <List.Content>
                    <a onClick={() => {onSelect(item.name);}}>{item.name}</a>
                  </List.Content>
                </List.Item>);

              })
            }
          </List>
        </Grid.Column>
     })
   }
  </Grid>
}
export default DocHeader;
