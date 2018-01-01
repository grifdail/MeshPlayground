export function formatFloat(f) {
  return `${Math.floor(f)}.${(f%1) ? (f%1).toString().slice(2) : "0" }`;
}
