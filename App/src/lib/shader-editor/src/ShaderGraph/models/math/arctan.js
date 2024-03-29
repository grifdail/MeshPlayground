import {VectorTransformation} from "../../utils.js"
const node = {
  ...VectorTransformation,
  name: "Arctangent",
  category: "trigonometry",
  GLSLOperation(A) {
    return `atan(${A})`;
  }
}

export default node;
