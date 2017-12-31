
const node = {
  name: "Number",
  category: "const",
  inputs: [],
  outputs: [
    {name: "value", type: "number"}
  ],
  params: [
    { name: "value", type:"number", default: 0}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.value} = ${params.value}`;
  }
}

export default node;
