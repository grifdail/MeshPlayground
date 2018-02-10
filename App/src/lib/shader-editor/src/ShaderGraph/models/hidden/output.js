
const node = {
  name: "Output",
  category: "hidden",
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
    return `gl_FragColor =  vec4(${inputs.color}, 1.0);`;
  }
}

export default node;
