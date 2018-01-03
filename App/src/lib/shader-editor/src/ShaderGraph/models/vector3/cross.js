export const Cross = {
  name: "Cross product",
  category: "vector3",
  inputs: [
    {name:"A", type:"vector3"},
    {name:"b", type:"vector3"},
  ],
  outputs: [
    {name:"value", type:"vector3"}
  ],
  toGLSL(inputs, params, outputs) {
    return `vec3 ${outputs.value} = cross(${inputs.A}, ${inputs.B});`;
  }
}

export default Cross;
