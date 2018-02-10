import {VectorTransformation} from "../../utils.js"
const node = {
  ...VectorTransformation,
  name: "Sine",
  category: "trigonometry",
  GLSLOperation(A) {
    return `sin(${A})`;
  }
}

export default node;
