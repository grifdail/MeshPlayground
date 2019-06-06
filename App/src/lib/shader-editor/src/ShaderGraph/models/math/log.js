import {VectorTransformation} from "../../utils.js"

const node = {
  ...VectorTransformation,
  name: "Logarithm",
  category: "math",
  GLSLOperation(A) {
    return `log(${A})`;
  }
}

export default node;
