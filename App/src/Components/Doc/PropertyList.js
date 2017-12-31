import React from 'react'
import { List} from 'semantic-ui-react';
import {getIconForType} from "./utils.js";



const PropertyList = ({content}) => {
  const paramsDescriptions = content.map(param => (
    <List.Item key={param.name}>
      <List.Icon name={getIconForType(param.type)} verticalAlign='top'/>
      <List.Content>
        <List.Header>{param.name}</List.Header>
        <List.Description >{param.type}</List.Description>
        {param.description ? <List.Description >{param.description}</List.Description> : null}
        {param.defaultValue ? <List.Description >{param.defaultValue}</List.Description> : null}
      </List.Content>
    </List.Item>
  ));
  return (
      <List divided relaxed>
        {paramsDescriptions}
      </List>
  )
}

export default PropertyList;
