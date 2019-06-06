
export const Lerp = {
  name: "Random",
  category: "math",
  inputs: [
    {name:"uv", type:"vector2"},
  ],
  outputs: [
    {name:"value", type:"float"}
  ],
  toGLSL(inputs, params, outputs, inputsTypes) {
    return `float ${outputs.value} = fract(sin(dot(${inputs.uv}, vec2(12.9898, 78.233))) * 43758.5453);`;
  }
}

export default Lerp;
