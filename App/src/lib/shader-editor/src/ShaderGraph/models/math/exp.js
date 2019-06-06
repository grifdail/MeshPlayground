import {VectorTransformation} from "../../utils.js"

const node = {
  ...VectorTransformation,
  name: "Exponantial",
  category: "math",
  GLSLOperation(A) {
    return `exp(${A})`;
  }
}

export default node;
