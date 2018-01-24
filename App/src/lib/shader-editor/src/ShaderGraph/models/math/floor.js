import {VectorTransformation} from "../../utils.js"
export const Floor = {
  ...VectorTransformation,
  name: "Floor",
  category: "math",
  GLSLOperation(A) {
    return `acos(${A})`;
  }
}

export default Floor;
