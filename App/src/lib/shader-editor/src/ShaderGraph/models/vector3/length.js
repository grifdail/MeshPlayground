
export const Length = {
  name: "Length",
  category: "vector",
  inputs: [
    {name:"vector", type:"vector3"},
  ],
  outputs: [
    {name:"length", type:"number"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.length} = length(${inputs.vector});`;
  }
}

export default Length;
