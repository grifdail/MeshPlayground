
const node = {
  name: "Decompose",
  category: "vector",
  inputs: [
    {name: "value", type: "vector3"}
  ],
  outputs: [
    { name: "X", type:"number", default: 0},
    { name: "Y", type:"number", default: 0},
    { name: "Z", type:"number", default: 0}
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.X} = ${inputs.value}.x;
    float ${outputs.Y} = ${inputs.value}.y;
    float ${outputs.Z} = ${inputs.value}.z;`;
  }
}

export default node;
