import {VectorTransformation} from "../../utils.js"
const node = {
  ...VectorTransformation,
  name: "Tangent",
  category: "math",
  GLSLOperation(A) {
    return `tan(${A})`;
  }
}

export default node;
