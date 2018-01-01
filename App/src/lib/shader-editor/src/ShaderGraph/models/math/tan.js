
const node = {
  name: "Tangent",
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
    return `float ${outputs.value} = tan(${inputs.A});`;
  }
}

export default node;
