import {typeToGLSL} from "../../utils.js"

export const If = {
  name: "If",
  category: "logic",
  inputs: [
    {name:"bool", type:"vector3"},
    {name:"true", type:"float|vector2|vector3|vector4"},
    {name:"false", type:"float|vector2|vector3|vector4"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  getOutputType(inputsTypes) {
    return [{name: "value", type: inputsTypes.true}];
  },
  toGLSL(inputs, params, outputs, inputsTypes) {
    const outputsPin = this.getOutputType(inputsTypes);
    const pin = outputsPin[0];
    const GLSLType = typeToGLSL[pin.type]
    if(!GLSLType) {
      throw new Error(`Type "${pin.type}" is not a valid GLSL type`);
    }
    console.log(outputs);
    return `${GLSLType} ${outputs.value} = ${inputs.bool} ? ${inputs.true} : ${inputs.false};`;
  }
}

export default If;
