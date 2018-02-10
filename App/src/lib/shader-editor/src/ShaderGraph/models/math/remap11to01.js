import {VectorTransformation} from "../../utils.js"

const node = {
  ...VectorTransformation,
  name: "Remap [-1,1] to [0,1]",
  category: "math",
  GLSLOperation(A) {
    return `${A} * 0.5 + 0.5`;
  }
}

export default node;
