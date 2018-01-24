import {VectorTransformation} from "../../utils.js"
const node = {
  ...VectorTransformation,
  name: "Square root",
  category: "math",
  GLSLOperation(A) {
    return `sqrt(${A})`;
  }
}

export default node;
