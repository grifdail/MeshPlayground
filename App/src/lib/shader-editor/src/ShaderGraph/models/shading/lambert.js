export const Lambert = {
  name: "Lambert",
  category: "shading",
  inputs: [
    {name:"light", type:"vector3"},
    {name:"normal", type:"vector3"},
    {name:"color", type:"vector3"},
  ],
  outputs: [
    {name:"value", type:"vector3"}
  ],
  toGLSL(inputs, params, outputs) {
    var light = inputs.light || "vec3(0.3,1,1)";
    var normal = inputs.normal || "vNormal";
    var color = inputs.color || "vColor";
    return `vec3 ${outputs.value} = ${color} * max(dot(normalize(${light}), normalize(${normal})), 0.0);;`;
  }
}

export default Lambert;
