
const node = {
  name: "Image",
  category: "inputs",
  outputs: [
    {name:"color", type:"vector3"}
  ],
  inputs: [
    {name:"uv", type:"vector2"}
  ],
  params: [
    {name: "image", type: "image", default:"image1"}
  ],
  toGLSL: (inputs, params, outputs) => {
    return `vec3 ${outputs.color} = texture2D(${params.image}, ${inputs.uv}).xyz;`;
  },
  requireUniform: (inputs, params, outputs) => {
    return `uniform sampler2D ${params.image};`;
  }
}

export default node;
