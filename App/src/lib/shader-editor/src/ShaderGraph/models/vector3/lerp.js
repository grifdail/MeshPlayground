
export const Lerp = {
  name: "Vector lerp",
  category: "vector3",
  inputs: [
    {name:"A", type:"vector3"},
    {name:"B", type:"vector3"},
    {name:"t", type:"float"},
  ],
  outputs: [
    {name:"result", type:"vector3"}
  ],
  toGLSL(inputs, params, outputs) {
    return `vec3 ${outputs.result} = lerp(${inputs.A}, ${inputs.B}, ${inputs.t});`;
  }
}

export default Lerp;
