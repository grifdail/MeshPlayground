import {debounce} from "./utils.js"
import {executeCode} from "./executeCode.js"
import {getObjectProperties, evolvePath} from "./utils.js";
import {saveSketch, updateSavedSketch, saveCurrentSketch,getLastSavedSketch, removeSketch } from "./storage.js"
import {not} from 'ramda';
import {defaultSketch} from './defaultState';

class Reducer {
  constructor(parent) {
    this._parent = parent;
    for(let [key, value] of getObjectProperties(this)) {
      if (typeof value === "function") {
        this[key] = value.bind(this);
      }
    }
    this.debouncedReloadGeometry = debounce(this.reloadGeometry, 1000);
  }
  setState(stateModifier, callback) {
    var p = new Promise((s,r) => {
      this._parent.setState(stateModifier, () => s(this.state));
    })
    if( callback) {
      p.then(callback);
    }
    return p;
  }
  get state() {
    return this._parent.state;
  }



  //Console
  //////////

  clearConsole() {
    return this.setState({console:[]})
  }

  log(message, type) {
    if (type === "error") {
      console.error(message);
    } else {
      console.log(message);
    }
    return this.setState(state => ({console: [...state.console, {message, type}]}));
  }



  //CurrentSketch
  ///////////////

  updateCode (code) {
    return this.setState({currentCode: code}, this.debouncedReloadGeometry);
  }

  updateShader (code) {
    return this.setState({shader: code});
  }

  updateSketchName(name) {
    return this.setState({sketchName: name, isInDatabase: false});
  }


  //geometry
  ///////////

  reloadGeometry () {
    return executeCode(this.state.currentCode,{print: this.log, clearConsole: this.clearConsole})
      .then(value => this.setState(value))
      .then((newState) => saveCurrentSketch(newState.sketchName, newState.currentCode))
      .catch(err => this.log(err, "error"));
  }


  //Save and Load
  ////////////////

  loadSketch(sketch, isInDatabase) {
    var ss = a => this.setState(a, this.debouncedReloadGeometry);
    if (sketch.code) {
      return ss({currentCode: sketch.code, sketchName: sketch.name, isInDatabase});
    }
    if (sketch.content) {
      return ss({currentCode: sketch.content, sketchName: sketch.name, isInDatabase});
    }
    if (sketch.codeUrl) {
      return fetch(sketch.codeUrl)
        .then(response => response.text())
        .then(str => ss({sketchName: sketch.name, currentCode: str, isInDatabase}))
    }
    return Promise.reject(new Error(sketch.toString() +" is not a valid sketch"));
  }

  updateSavedSketch() {
    return updateSavedSketch().then(sketchesData => this.setState({savedSketches: sketchesData}));
  }

  saveSketch() {
    return saveSketch(this.state.sketchName, this.state.currentCode)
      .then(this.updateSavedSketch)
  }

  loadLastValidSketch() {
    const lastSavedSketch = getLastSavedSketch();
    if (lastSavedSketch) {
      return this.loadSketch(lastSavedSketch, false);
    }
    return Promise.resolve(null);
  }

  resetSketch() {
    return this.loadSketch(defaultSketch(), false);
  }

  deleteSketch() {
    return removeSketch(this.state.sketchName)
      .then(this.updateSavedSketch)
      .then(this.setState({isInDatabase: false}))
  }

  //Camera Controll
  /////////////////

  toogleCameraRotation() {
    return this.setState(evolvePath(['camera', 'autoRotate'], not));
  }

  resetCamera() {
    return this.setState(evolvePath(['camera', 'reset'], not));
  }

}

export default Reducer;
