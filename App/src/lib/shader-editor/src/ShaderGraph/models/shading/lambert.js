export const Lambert = {
  name: "Lambert",
  category: "shading",
  inputs: [
    {name:"light", type:"vector3"},
    {name:"normal", type:"vector3"},
    {name:"color", type:"vector3"},
  ],
  outputs: [
    {name:"color", type:"vector3"},
    {name:"value", type:"number"}
  ],
  toGLSL(inputs, params, outputs, types, variables) {
    var light = inputs.light || "vec3(0.3,1,1)";
    var normal = inputs.normal || "vNormal";
    var color = inputs.color || "vColor";
    return `float ${outputs.value} = max(dot(normalize(${light}), normalize(${normal})), 0.0);
    vec3 ${outputs.color} = ${color} * ${outputs.value} ;`;
  }
}

export default Lambert;
