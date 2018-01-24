import {VectorTransformation} from "../../utils.js"

const node = {
  ...VectorTransformation,
  name: "Cosine",
  category: "math",
  GLSLOperation(A) {
    return `cos(${A})`;
  }
}

export default node;
