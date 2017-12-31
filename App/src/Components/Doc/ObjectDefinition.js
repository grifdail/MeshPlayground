import React from 'react'
import TemplateDefinition from "./TemplateDefinition.js"
import { Accordion} from 'semantic-ui-react';
import DefinitionGroup from "./DefinitionGroup.js"

const ObjectDefinition = ({...props, properties}) => {
  const panels = [
    {
      title: 'Properties',
      content: {content:<DefinitionGroup content={properties} />, key:"properties"},
    }
  ]
  return (
    <TemplateDefinition {...props}>
      <Accordion panels={panels}/>

    </TemplateDefinition>
  )
}

export default ObjectDefinition;
