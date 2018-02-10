export const Dot = {
  name: "Dot product",
  category: "vector",
  inputs: [
    {name:"A", type:"vector3"},
    {name:"B", type:"vector3"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  toGLSL(inputs, params, outputs) {
    return `float ${outputs.value} = dot(${inputs.A}, ${inputs.B});`;
  }
}

export default Dot;
