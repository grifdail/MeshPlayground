
const node = {
  name: "Background Color",
  category: "inputs",
  outputs: [
    {name: "value", type: "vector3"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.value} = backgroundColor;`;
  },
  requireUniform: () => {
    return "uniform vec3 backgroundColor;";
  }
}

export default node;
