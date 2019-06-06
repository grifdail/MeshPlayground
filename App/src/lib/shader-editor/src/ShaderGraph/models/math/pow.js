import {typeToGLSL} from "../../utils.js";

export const Lerp = {
  name: "Pow",
  category: "math",
  inputs: [
    {name:"value", type:"number|vector2|vector3|vector4"},
    {name:"power", type:"number"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  getOutputType(inputsTypes) {
    return [{name: "value", type: inputsTypes.value}];
  },
  toGLSL(inputs, params, outputs, inputsTypes) {
    var type = this.getOutputType(inputsTypes, params)[0];
    return `${typeToGLSL[type.type]} ${outputs.value} =  pow(${inputs.value}, ${inputs.power});`;
  }
}

export default Lerp;
