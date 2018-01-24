export const Clamp = {
  name: "Clamp",
  category: "math",
  inputs: [
    {name:"min", type:"number"},
    {name:"max", type:"number"},
    {name:"value", type:"number"},
  ],
  outputs: [
    {name:"value", type:"number"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.value} = clamp(${inputs.value}, ${inputs.min}, ${inputs.max});`;
  }
}

export default Clamp;
