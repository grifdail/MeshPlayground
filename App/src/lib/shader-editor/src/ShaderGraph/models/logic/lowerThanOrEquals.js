export const If = {
  name: "LowerThanOrEquals",
  category: "logic",
  inputs: [
    {name:"A", type:"float"},
    {name:"B", type:"float"},
  ],
  outputs: [
    {name:"value", type:"bool"}
  ],
  toGLSL(inputs, params, outputs, inputsTypes)  {
    return `bool ${outputs.value} = ${inputs.A} <= ${inputs.B};`;
  }
}

export default If;
