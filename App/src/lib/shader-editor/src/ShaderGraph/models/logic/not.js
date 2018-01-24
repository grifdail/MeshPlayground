export const If = {
  name: "Not",
  category: "logic",
  inputs: [
    {name:"A", type:"bool"}
  ],
  outputs: [
    {name:"value", type:"bool"}
  ],
  toGLSL(inputs, params, outputs, inputsTypes)  {
    return `bool ${outputs.value} = ${inputs.A};`;
  }
}

export default If;
