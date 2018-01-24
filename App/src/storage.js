import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
    sketches: `name, code, content, codeUrl, shaderGraph`
});
var openPromise = Promise.resolve().then(() => db.open())


export function saveSketch(name, code, shaderGraph) {
  return openPromise.then(() =>
    db.sketches.put({name, code, shaderGraph})
  );

}

export function removeSketch(name) {
  return openPromise.then(() =>
    db.sketches
      .where('name')
      .equals(name)
      .delete()
    );

}

export function updateSavedSketch() {
  return openPromise.then(() => db.sketches.toArray());
}

const LAST_VALIDE_CODE = "lastValideMeshEditorCode";
const LAST_VALIDE_NAME = "lastValideMeshEditorName";
const LAST_VALIDE_SHADER_CODE = "lastValideMeshEditorShaderCode";
const LAST_VALIDE_SHADER_GRAPH = "lastValideMeshEditorShaderGraph";

export function saveCurrentSketch(name, code) {
  localStorage.setItem(LAST_VALIDE_CODE,code);
  localStorage.setItem(LAST_VALIDE_NAME,name);
}
export function saveCurrentShaderCode(code) {
  localStorage.setItem(LAST_VALIDE_SHADER_CODE,JSON.stringify(code));
}
export function saveCurrentShaderGraph(code) {
  localStorage.setItem(LAST_VALIDE_SHADER_GRAPH,JSON.stringify(code));
}

function getJsonStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return undefined;
  }
}

export function getLastSavedSketch() {
  return localStorage.getItem(LAST_VALIDE_CODE)  ? {
    code: localStorage.getItem(LAST_VALIDE_CODE),
    name: localStorage.getItem(LAST_VALIDE_NAME),
    shaderGraph: getJsonStorage(LAST_VALIDE_SHADER_GRAPH),
    shader: getJsonStorage(LAST_VALIDE_SHADER_CODE)
  } : null;
}
