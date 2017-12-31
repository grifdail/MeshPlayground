import {map, repeat, curry, assocPath, assoc, prop, path, add, contains} from "ramda";
export const updateWhere = curry((where, change, list) => map(item => (where(item) ? change(item) : item), list));
export const updatePath = curry((propPath, fn, obj) => assocPath(propPath, fn(path(propPath, obj)), obj));
export const updateProp = curry((propPath, fn, obj) => assoc(propPath, fn(prop(propPath, obj)), obj));
export const hasPropInList = curry((propName, list, object) => contains(prop(propName, object),list));
const alpha = "azertyuiopqsdfghjklmwxcvbn"
export const randomNodeName = (n=10) => {
  return map(() => alpha[Math.floor(Math.random()*alpha.length)], repeat("a",n)).join("");
}
