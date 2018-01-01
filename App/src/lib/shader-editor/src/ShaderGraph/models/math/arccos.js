
const node = {
  name: "Arccosine",
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
    return `float ${outputs.value} = acos(${inputs.A});`;
  }
}

export default node;
