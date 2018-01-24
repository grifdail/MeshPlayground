import { append, assoc, empty, forEach, add, mergeWith, merge } from "ramda";
import { updateProp, updatePath } from "../utils.js";



const createInitialData = () => {
  return {
    dragInitialPos: {x:0, y:0},
    draggedItems: [],
    mousePosition: {x:0, y:0},
    startingPin: null,
    viewport: {
      x: 0,
      y: 0,
      zoom: 1
    }
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

  updateMousePosition(e) {
    return new EditorState(merge(this.data,{
      mousePosition: e.world,
      mousePositionCanvas: e.canvas
    }));
  }

  zoom(delta) {
    return new EditorState(updatePath(["viewport", "zoom"], oldZoom => Math.min(1.5, Math.max(0.1, oldZoom*(1+Math.sign(delta)*0.05))), this.data))
  }
  updatePan(newPosition) {
    const op = this.data.mousePositionCanvas;
    const delta = {x: newPosition.x - op.x, y: newPosition.y - op.y};
    return new EditorState(updateProp("viewport", mergeWith(add, delta), this.data))
  }
}

forEach((name) => {
  EditorState[name] = (...args) => ({name, args});
}, Object.getOwnPropertyNames(EditorState.prototype))
