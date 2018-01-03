
export const Floor = {
  name: "Floor",
  category: "math",
  inputs: [
    {name:"A", type:"float"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.value} = floor(${inputs.A});`;
  }
}

export default Floor;
