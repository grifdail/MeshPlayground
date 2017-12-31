
const node = {
  name: "Division",
  category: "math",
  inputs: [
    { name: "A", type:"number", default: 0},
    { name: "B", type:"number", default: 0}
  ],
  outputs: [
    {name: "value", type: "number"}
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.value} = ${inputs.A} / ${inputs.B}`;
  }
}

export default node;
