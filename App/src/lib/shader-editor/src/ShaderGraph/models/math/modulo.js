
import{VectorFloatOperation} from "../../utils.js";
const node = {
  ...VectorFloatOperation,
  name: "Modulo",
  category: "math",

  GLSLOperation: (A, B) => `mod(${A}, ${B})`
}

export default node;
