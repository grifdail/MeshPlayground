
const node = {
  name: "Normal vector",
  category: "inputs",
  outputs: [
    {name: "value", type: "vector3"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.value} = vNormal;`;
  }
}

export default node;
