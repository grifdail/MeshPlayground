
export const Normalize = {
  name: "Normalize",
  category: "vector3",
  inputs: [
    {name:"vector", type:"vector3"},
  ],
  outputs: [
    {name:"length", type:"float"}
  ],
  toGLSL(inputs, params, outputs) {
    return `vec3 ${outputs.length} = normalize(${inputs.vector});`;
  }
}

export default Normalize;
