
const node = {
  name: "Vertex Color",
  category: "inputs",
  outputs: [
    {name: "value", type: "vector3"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.value} = vColor;`;
  }
}

export default node;
