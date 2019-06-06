export const Clamp = {
  name: "Clamp [0, 1]",
  category: "math",
  inputs: [
    {name:"value", type:"number"},
  ],
  outputs: [
    {name:"value", type:"number"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.value} = clamp(${inputs.value}, 0.0, 1.0);`;
  }
}

export default Clamp;
