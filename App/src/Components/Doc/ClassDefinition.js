import React from 'react'
import { Accordion} from 'semantic-ui-react';
import TemplateDefinition from "./TemplateDefinition.js"
import PropertyList from "./PropertyList.js"
import DefinitionGroup from "./DefinitionGroup.js"


const ClassDefinition = ({properties, methodes, statics, ...props}) => {
  const panels = [
    {
      title: 'Properties',
      content: {content:<PropertyList content={properties} />, key:"properties"},
    },
    {
      title: 'Methodes',
      content: {content:<DefinitionGroup content={methodes} />, key:"methodes"},
    },
    {
      title: 'Static methodes',
      content: {content:<DefinitionGroup content={statics} />, key:"statics"},
    },
  ]
  return (
    <TemplateDefinition {...props}>
      <Accordion panels={panels}/>

    </TemplateDefinition>
  )
}

export default ClassDefinition;
