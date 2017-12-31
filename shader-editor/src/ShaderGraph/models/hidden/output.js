
const node = {
  name: "Output",
  category: "vector3",
  canBeCreated: false,
  canBeDestroyed: false,
  inputs: [
    { name: "color", type:"vector3", default: 0},
  ],
  outputs: [
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `gl_FragColor = new vec4(${inputs.color}, 1.0)`;
  }
}

export default node;
