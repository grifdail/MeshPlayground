
export const Length = {
  name: "Length",
  category: "vector3",
  inputs: [
    {name:"vector", type:"vector3"},
  ],
  outputs: [
    {name:"length", type:"float"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.length} = length(${inputs.vector});`;
  }
}

export default Length;
