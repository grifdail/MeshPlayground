
export const Normalize = {
  name: "Normalize",
  category: "vector",
  inputs: [
    {name:"vector", type:"vector3"},
  ],
  outputs: [
    {name:"normalized", type:"vector3"}
  ],
  toGLSL(inputs, params, outputs) {
    return `vec3 ${outputs.normalized} = normalize(${inputs.vector});`;
  }
}

export default Normalize;
