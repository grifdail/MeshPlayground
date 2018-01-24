export const If = {
  name: "And",
  category: "logic",
  inputs: [
    {name:"A", type:"bool"},
    {name:"B", type:"bool"},
  ],
  outputs: [
    {name:"value", type:"bool"}
  ],
  toGLSL(inputs, params, outputs, inputsTypes) {
    return `bool ${outputs.value} = ${inputs.A} && ${inputs.B};`;
  }
}

export default If;
