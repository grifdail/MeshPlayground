import {VectorTransformation} from "../../utils.js"

const node = {
  ...VectorTransformation,
  name: "Cosine",
  category: "trigonometry",
  GLSLOperation(A) {
    return `cos(${A})`;
  }
}

export default node;
