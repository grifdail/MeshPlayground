
const node = {
  name: "Camera Position",
  category: "inputs",
  outputs: [
    {name: "value", type: "vector3"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.value} = cameraPosition;`;
  }
}

export default node;
