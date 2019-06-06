

const node = {
  name: "TAU",
  category: "const",
  inputs: [],
  outputs: [
    {name: "value", type: "number"}
  ],
  params: [
    { name: "value", type:"number", default: 0}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.value} = TAU;`;
  },
  requireUniform: () => {
    return `#define TAU 6.28318`;
  }
}

export default node;
