import {curry, path, assocPath} from 'ramda'

export function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function toTitleCase(text) {
  var result = text.replace( /([A-Z])/g, " $1" );
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export function memoize(foo, comparator) {
  let cache = new Map();
  const InvalidObject = Symbol();
  const findValue = lookFor => {
    for(let [key, value] of cache) {
      if (comparator(key, lookFor)) {
        return value;
      }
    }
    return InvalidObject;
  }

  return (...args) => {
   let value = findValue(args)
   if(value !== InvalidObject) {
     return value
   }
   const executionResult = foo(...args)

   cache.set(args, executionResult)

   return executionResult;
  }
}

export function* getObjectProperties(b) {
  for (let o = b; o !== Object.prototype; o = Object.getPrototypeOf(o)) {
    for (let name of Object.getOwnPropertyNames(o)) {
      yield [name, b[name]];
    }
  }
}

/*
export function isClass(v) {


}

*/
export function isClass(v, name) {

  if (typeof v !== 'function') {
    return false;
  }
  if (!name){name=v.name}

  if (typeof v === 'function' && isUpperCase(name[0])) {
    return true
  }
}

export function isUpperCase(c) {
  return c.toUpperCase() === c;
}

export const evolvePath = curry((_path, fn, obj) => {
  return assocPath(_path, fn(path(_path, obj)), obj)
})
export const getLineNumber = (err) => {
  const regex = /<anonymous>:(\d+):\d+/g;
  const str = err.stack;
  let m = regex.exec(str);
  if(m && m[1]) {
    return parseFloat(m[1])-2;
  }
  return -1;
}
