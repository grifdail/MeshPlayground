export const If = {
  name: "GreaterThanOrEquals",
  category: "logic",
  inputs: [
    {name:"A", type:"float"},
    {name:"B", type:"float"},
  ],
  outputs: [
    {name:"value", type:"bool"}
  ],
  toGLSL(inputs, params, outputs, inputsTypes)  {
    return `float ${outputs.value} = ${inputs.A} >= ${inputs.B};`;
  }
}

export default If;
