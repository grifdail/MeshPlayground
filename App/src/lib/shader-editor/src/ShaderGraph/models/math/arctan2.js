
const node = {
  name: "Arctangent2",
  category: "math",
  inputs: [
    { name: "X", type:"number", default: 0},
    { name: "Y", type:"number", default: 0}
  ],
  outputs: [
    {name: "value", type: "number"}
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.value} = atan(${inputs.Y}, ${inputs.X});`;
  }
}

export default node;
