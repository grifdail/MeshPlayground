
const node = {
  name: "World Position",
  category: "inputs",
  outputs: [
    {name: "value", type: "vector3"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.value} = vPosition;`;
  }
}

export default node;
