
import{VectorFloatOperationOutputType} from "../../utils.js";

const node = {
  ...VectorFloatOperationOutputType,
  name: "Multiplication",
  category: "math",
  GLSLOperation: (A, B) => `${A} * ${B}`
}

export default node;
