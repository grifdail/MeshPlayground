import {formatFloat} from "../utils.js";

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
    return `vec3 ${outputs.value} = vec3(${formatFloat(params.value.x)}, ${formatFloat(params.value.y)}, ${formatFloat(params.value.z)});`;
  }
}

export default node;
