import React from 'react'
import { Icon} from 'semantic-ui-react';
import { prop } from 'ramda';
import {getIconForType} from "./utils.js";
import TemplateDefinition from "./TemplateDefinition.js"
import PropertyList from "./PropertyList.js"


const FunctionDefinition = ({name, params, returnValue, ...props}) => {
	console.log(name, props);
  const displayName = `${name}(${params.map(prop('name')).join(', ')})`;
  return (
    <TemplateDefinition {...props} name={displayName} >
      {returnValue ? <p>return a <Icon name={getIconForType(returnValue.type)}/>{returnValue.type} {props.description}</p> : null}
      <PropertyList content={params}/>
    </TemplateDefinition>
  )
}

export default FunctionDefinition;
