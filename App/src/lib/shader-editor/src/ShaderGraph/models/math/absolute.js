export const Abs = {
  name: "Absolute",
  category: "math",
  inputs: [
    {name:"A", type:"float"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  toGLSLS(inputs, outputs, params) {
    return `float ${outputs.value} = abs(${inputs.A});`;
  }
}


export default Abs;
