import {mergeWith, add, compose, append, reject, pathEq, curry, assoc, empty, reduce, forEach} from "ramda";
import {updateWhere, updateProp, randomNodeName } from "../utils.js";



const createInitialData = () => {
  return {
    dragInitialPos: {x:0, y:0},
    draggedItems: [],
    mousePosition: {x:0, y:0},
    startingPin: null
  }
}

export class EditorState {
  constructor(data = null) {
    if (!data) {
      data = createInitialData();
    }
    this.data = data;
  }

  addDraggedNode(nodeName) {
    return new EditorState(updateProp('draggedItems', append(nodeName), this.data));
  }
  updateDrag(initialPosition) {
    return new EditorState(assoc("dragInitialPos", initialPosition, this.data))
  }
  endDrag() {
    return new EditorState(updateProp('draggedItems', empty, this.data));
  }

  startConnection(startingPin) {
    return new EditorState(assoc("startingPin", startingPin, this.data));
  }
  endConnection() {
    return new EditorState(assoc("startingPin", null, this.data));
  }

  updateMousePosition(pos) {
    return new EditorState(assoc("mousePosition", pos, this.data));
  }
  zoom(delta) {

  }
  pan(delta) {

  }
}

forEach((name) => {
  EditorState[name] = (...args) => ({name, args});
}, Object.getOwnPropertyNames(EditorState.prototype))
