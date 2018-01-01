
const node = {
  name: "Time",
  category: "inputs",
  inputs: [
  ],
  outputs: [
    {name: "time", type: "number"}
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.time} = time;`;
  },
  requireUniform: () => {
    return "uniform float time;";
  }
}

export default node;
