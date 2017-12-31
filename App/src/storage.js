import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
    sketches: `name, code, content, codeUrl`
});
var openPromise = Promise.resolve().then(() => db.open())


export function saveSketch(name, code) {
  return openPromise.then(() =>
    db.sketches.put({name, code})
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

export function saveCurrentSketch(name, code) {
  localStorage.setItem(LAST_VALIDE_CODE,code);
  localStorage.setItem(LAST_VALIDE_NAME,name);
}

export function getLastSavedSketch() {
  return localStorage.getItem(LAST_VALIDE_CODE)  ? {
    code: localStorage.getItem(LAST_VALIDE_CODE),
    name: localStorage.getItem(LAST_VALIDE_NAME)
  } : null;
}
