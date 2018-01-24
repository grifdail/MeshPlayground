import{SameTypeOperation} from "../../utils.js";

export const Max = {
  ...SameTypeOperation,
  name: "Max",
  category: "math",
  GLSLOperation: (A, B) => `max(${A}, ${B})`
}

export default Max;
