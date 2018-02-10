import {VectorTransformation} from "../../utils.js"

const node = {
  ...VectorTransformation,
  name: "Remap [0,1] to [-1,1]",
  category: "math",
  GLSLOperation(A) {
    return `${A} * 2.0 - 1.0`;
  }
}

export default node;
