import React, {Component} from 'react'

export function formatFloat(f) {
  return `${Math.floor(f)}.${(f%1) ? (f%1).toString().slice(2) : "0" }`;
}

export const typeToGLSL = {
  "number": "float",
  "vector2": "vec2",
  "vector3": "vec3",
  "vector4": "vec4"
}

export const VectorFloatOperationOutputType = {
  inputs: [
    { name: "A", type:"number|vector2|vector3|vector4", default: 0},
    { name: "B", type:"number|vector2|vector3|vector4", default: 0}
  ],
  outputs: [
    {name: "value", type: "number"}
  ],
  params: [

  ],
  GLSLOperation(A, B) {
    throw new Error(`Vector / Float operation ${this.name} not implemented.`);
  },
  getOutputType(inputsTypes) {
    if(inputsTypes.A === "number" && inputsTypes.B === "number") {
      return [{name: "value", type: "number"}];
    }
    if(inputsTypes.A === "number") {
      return [{name: "value", type: inputsTypes.B}];
    }
    if(inputsTypes.B === "number") {
      return [{name: "value", type: inputsTypes.A}];
    }
    return [{name: "value", type: inputsTypes.A}];
  },
  toGLSL(inputs, params, outputs, inputsPin) {
    const outputsPin = this.getOutputType(inputsPin);
    const pin = outputsPin[0];
    const GLSLType = typeToGLSL[pin.type]
    console.log(pin,typeToGLSL, GLSLType, outputsPin)
    if(!GLSLType) {
      throw new Error(`Type "${pin.type}" is not a valid GLSL type`);
    }
    return `${GLSLType} ${outputs.value} = ${this.GLSLOperation(inputs.A, inputs.B)};`;
  }
}



export class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      text: props.value.toString()
    }
  }
  updateValueFromProps(props) {
    this.setState({value: props.value, text: props.value.toString()})
  }

  componentWillReceiveProps(nextProps) {
  if (this.props.value !== nextProps.value) {
    this.updateValueFromProps(nextProps);
  }
}
  onChange = (e) => {
    const value = e.target.value;
    const floatValue = parseFloat(value);
    this.setState({text: value});
    if (!isNaN(floatValue)) {
      this.props.onChange(floatValue);
    }
  }
  onBlur = () => {
    this.updateValueFromProps(this.props);
  }

  render() {
    const {onChange, ...props} = this.props;
    return <input  {...this.props} value={this.state.text} onChange={this.onChange} onBlur={this.onBlur} {...props}/>
  }
}
