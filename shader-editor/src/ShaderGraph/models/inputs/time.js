
const node = {
  name: "Time",
  category: "inputs",
  inputs: [
  ],
  outputs: [
    {name: "time", type: "number"}
  ],
  params: [

  ],
  toGLSL: (inputs, params, outputs) => {
    return `float ${outputs.value} = time`;
  }
}

export default node;
