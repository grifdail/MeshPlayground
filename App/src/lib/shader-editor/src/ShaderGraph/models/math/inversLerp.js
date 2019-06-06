import {typeToGLSL} from "../../utils.js";

export const Lerp = {
  name: "Invers Lerp",
  category: "math",
  inputs: [
    {name:"from", type:"number|vector2|vector3|vector4"},
    {name:"to", type:"number|vector2|vector3|vector4"},
    {name:"t", type:"number|vector2|vector3|vector4"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  getOutputType(inputsTypes) {
    return [{name: "value", type: inputsTypes.from}];
  },
  toGLSL(inputs, params, outputs, inputsTypes) {
    var type = this.getOutputType(inputsTypes, params)[0];
    return `${typeToGLSL[type.type]} ${outputs.value} =  (${inputs.t}-${inputs.from})/(${inputs.to}-${inputs.from});`;
  }
}

export default Lerp;
