
const node = {
  name: "UV coordinate",
  category: "inputs",
  outputs: [
    {name: "value", type: "vector2"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec2 ${outputs.value} = vUV;`;
  }
}

export default node;
