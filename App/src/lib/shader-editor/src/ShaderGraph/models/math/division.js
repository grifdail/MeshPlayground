
import{VectorFloatOperation} from "../../utils.js";

const node = {
    ...VectorFloatOperation,
  name: "Division",
  category: "math basic",
  GLSLOperation: (A, B) => `${A} / ${B}`
}

export default node;
