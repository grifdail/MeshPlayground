export const Lerp = {
  name: "Lerp",
  category: "math",
  inputs: [
    {name:"from", type:"float"},
    {name:"to", type:"float"},
    {name:"t", type:"float"},
  ],
  outputs: [
    {name:"length", type:"float"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.length} = ùix(${inputs.from}, ${inputs.to}, ${inputs.to});`;
  }
}

export default Lerp;
