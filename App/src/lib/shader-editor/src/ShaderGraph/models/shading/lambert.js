export const Lambert = {
  name: "Lambert",
  category: "shading",
  inputs: [
    {name:"min", type:"float"},
    {name:"max", type:"float"},
    {name:"value", type:"float"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  toGLSLS(inputs, outputs, params) {
    return `float ${outputs.value} = clamp(${inputs.value}, ${inputs.min}, ${inputs.max});`;
  }
}

export default Lambert;
