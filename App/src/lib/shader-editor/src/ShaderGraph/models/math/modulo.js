
const node = {
  name: "Modulo",
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
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.value} = mod(${inputs.A}, ${inputs.B});`;
  }
}

export default node;
