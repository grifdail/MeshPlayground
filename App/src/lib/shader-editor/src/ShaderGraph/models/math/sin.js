import {VectorTransformation} from "../../utils.js"
const node = {
  ...VectorTransformation,
  name: "Sine",
  category: "math",
  GLSLOperation(A) {
    return `sin(${A})`;
  }
}

export default node;
