
const node = {
  name: "Decompose",
  category: "vector3",
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
    return `float ${outputs.X} = ${input.value}.x
    float ${outputs.Y} = ${input.value}.y;
    float ${outputs.Z} = ${input.value}.z;`;
  }
}

export default node;
