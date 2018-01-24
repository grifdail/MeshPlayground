import {VectorTransformation} from "../../utils.js"

const node = {
  ...VectorTransformation,
  name: "Arccosine",
  category: "math",
  GLSLOperation(A) {
    return `acos(${A})`;
  }
}

export default node;
