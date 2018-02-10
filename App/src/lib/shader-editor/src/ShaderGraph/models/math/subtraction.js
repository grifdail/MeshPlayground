import{SameTypeOperation} from "../../utils.js";

const node = {
  ...SameTypeOperation,
  name: "Subtraction",
  category: "math basic",
  GLSLOperation: (A, B) => `${A} - ${B}`
}

export default node;
