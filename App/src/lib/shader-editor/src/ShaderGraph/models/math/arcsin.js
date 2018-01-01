
const node = {
  name: "Arcsine",
  category: "math",
  inputs: [
    { name: "A", type:"number", default: 0}
  ],
  outputs: [
    {name: "value", type: "number"}
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.value} = asin(${inputs.A});`;
  }
}

export default node;
