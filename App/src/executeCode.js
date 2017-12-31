
import {GeneratorContext} from "./MeshTools/GeneratorContext.js";
import {getObjectProperties, isClass} from "./utils.js";

const buildResponse = (context) => {
    return {
      geometry:context._generateMesh(),
      texture: context._texture,
      backgroundColor: context._backgroundColor
    };

}

export function executeCode(str, console) {
  return new Promise((fullfill, reject) => {
    var context = new GeneratorContext();
    var names = [];
    var params = [];
    Object.assign(context, console);
    for(let [key, value] of getObjectProperties(context)) {
      if (key[0] !== "_") {
        names.push(key);
        params.push((typeof value) === "function" && !isClass(value, key) ? value.bind(context) : value);
      }
    }
    console.clearConsole();
    // eslint-disable-next-line no-new-func
    var fn = (new Function(...names, str)).bind(context);

    var promise = fn(...params);
    if (promise && typeof promise.then === "function") {
      promise.then(() => fullfill(buildResponse(context)), reject);
    }
    else {
      fullfill(buildResponse(context));
    }
  });
}
