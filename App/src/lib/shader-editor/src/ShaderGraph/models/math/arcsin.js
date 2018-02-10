import {VectorTransformation} from "../../utils.js"
const node = {
  ...VectorTransformation,
  name: "Arcsine",
  category: "trigonometry",
  GLSLOperation(A) {
    return `asin(${A})`;
  }
}

export default node;
