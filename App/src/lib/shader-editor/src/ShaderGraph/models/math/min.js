export const Min = {
  name: "Min",
  category: "math",
  inputs: [
    {name:"A", type:"float"},
    {name:"b", type:"float"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.value} = min(${inputs.A}, ${inputs.B});`;
  }
}


export default Min;
