

const node = {
  name: "PI",
  category: "const",
  inputs: [],
  outputs: [
    {name: "value", type: "number"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.value} = PI;`;
  },
  requireUniform: () => {
    return `#define PI 3.14159`;
  }
}

export default node;
