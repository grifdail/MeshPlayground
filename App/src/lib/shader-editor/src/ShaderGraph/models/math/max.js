export const Max = {
  name: "Max",
  category: "math",
  inputs: [
    {name:"A", type:"float"},
    {name:"b", type:"float"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.value} = max(${inputs.A}, ${inputs.B});`;
  }
}

export default Max;
