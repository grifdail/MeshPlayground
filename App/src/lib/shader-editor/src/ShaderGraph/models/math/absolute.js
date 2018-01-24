import {VectorTransformation} from "../../utils.js"

export const Abs = {
  ...VectorTransformation,
  name: "Absolute",
  category: "math",
  GLSLOperation(A) {
    return `abs(${A})`;
  }
}


export default Abs;
