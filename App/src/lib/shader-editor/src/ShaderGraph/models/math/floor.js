import {VectorTransformation} from "../../utils.js"
export const Floor = {
  ...VectorTransformation,
  name: "Floor",
  category: "math",
  GLSLOperation(A) {
    return `floor(${A})`;
  }
}

export default Floor;
