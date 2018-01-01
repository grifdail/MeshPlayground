
const node = {
  name: "Vector Division",
  category: "vector3",
  inputs: [
    { name: "A", type:"vector3", default: 0},
    { name: "B", type:"vector3", default: 0}
  ],
  outputs: [
    {name: "value", type: "vector3"}
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.value} = ${inputs.A} / ${inputs.B};`;
  }
}

export default node;
