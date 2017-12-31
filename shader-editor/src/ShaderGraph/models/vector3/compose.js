
const node = {
  name: "Compose",
  category: "vector3",
  inputs: [
    { name: "X", type:"number", default: 0},
    { name: "Y", type:"number", default: 0},
    { name: "Z", type:"number", default: 0}
  ],
  outputs: [
    {name: "value", type: "vector3"}
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.value} = new vec3(${inputs.X}, ${inputs.Y} , ${inputs.Z})`;
  }
}

export default node;
