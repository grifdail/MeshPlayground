import StackTracey  from 'stacktracey';

export function Error(message, remove = 1) {
  const stack = new StackTracey();
  return {isError: true, message, stack: stack.slice(remove+1)}
}

export function ParamError(name, types, params, remove = 1) {
  const message = `Function ${name} require parameter of type (${types.join(", ")}) but received (${params.map(a => typeof a).join(", ")})`;
  const stack = new StackTracey();
  return {isError: true, message, stack: stack.slice(remove+1)}
}
