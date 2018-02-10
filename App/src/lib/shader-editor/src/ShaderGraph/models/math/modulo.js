
import{VectorFloatOperation} from "../../utils.js";
const node = {
  ...VectorFloatOperation,
  name: "Modulo",
  category: "math basic",

  GLSLOperation: (A, B) => `mod(${A}, ${B})`
}

export default node;
