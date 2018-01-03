export const Clamp = {
  name: "Clamp",
  category: "math",
  inputs: [
    {name:"min", type:"float"},
    {name:"max", type:"float"},
    {name:"value", type:"float"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.value} = clamp(${inputs.value}, ${inputs.min}, ${inputs.max});`;
  }
}

export default Clamp;
