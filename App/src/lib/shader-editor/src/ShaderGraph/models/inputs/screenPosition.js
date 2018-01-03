
const node = {
  name: "Screen Position",
  category: "inputs",
  outputs: [
    {name: "value", type: "vector2"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec2 ${outputs.value} = vPosition;`;
  }
}

export default node;
