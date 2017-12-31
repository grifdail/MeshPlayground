
const node = {
  name: "Vector3",
  category: "const",
  inputs: [],
  outputs: [
    {name: "value", type: "vector3"}
  ],
  params: [
    { name: "value", type:"vector3", default: {x:0,y:0,z:0}},
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.value} = new vec3(${params.value.x}, ${params.value.y}, ${params.value.z})`;
  }
}

export default node;
