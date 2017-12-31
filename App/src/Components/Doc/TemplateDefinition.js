import React from 'react'
import {  Icon, Item, Label} from 'semantic-ui-react';
import {getIconForType} from "./utils.js";



const TemplateDefinition = ({name, type, tags, onSelectTag, description, children, illustration}) => {
  const icon = getIconForType(name) || getIconForType(type);
  return (
    <Item className="item-description">
      {illustration ? <Item.Image size='small' src={illustration} /> : null}
      <Item.Content>
          <Item.Header>{icon ? <Icon name={icon} /> : null}{name}</Item.Header>
          <div className="labelList">
            {tags.map(t=><Label as="a" onClick={() => onSelectTag(t)} key={t}>{t}</Label>)}
          </div>
          <Item.Meta>{description}</Item.Meta>
          <Item.Description>
            {children}
          </Item.Description>
      </Item.Content>
    </Item>
  )
}

export default TemplateDefinition;
