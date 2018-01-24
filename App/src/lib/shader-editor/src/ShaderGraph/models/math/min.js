import{SameTypeOperation} from "../../utils.js";

export const Min = {
  ...SameTypeOperation,
  name: "Min",
  category: "math",
  GLSLOperation: (A, B) => `min(${A}, ${B})`
}


export default Min;
