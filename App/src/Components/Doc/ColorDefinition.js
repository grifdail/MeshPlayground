import React from 'react'
import TemplateDefinition from "./TemplateDefinition.js"


export const ColorDefinition = ({value,...props}) => {
  return (
    <TemplateDefinition {...props}>
      <span className="color-preview" style={{backgroundColor: value.toString()}}></span>
    </TemplateDefinition>
  )
}

export const ColorPaletteDefinition = ({colors, ...props}) => {
  return (
    <TemplateDefinition {...props}>
      {colors.map((value,i) =>
        <span key={i} className="color-preview" style={{backgroundColor: value.toString()}}></span>
      )}

    </TemplateDefinition>
  )
}

export default ColorDefinition;
