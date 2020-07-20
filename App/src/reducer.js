import {debounce} from "./utils.js"
import {executeCode} from "./executeCode.js"
import {getObjectProperties, evolvePath} from "./utils.js";
import {saveSketch, updateSavedSketch, saveCurrentSketch,getLastSavedSketch, removeSketch, saveCurrentShaderCode, saveCurrentShaderGraph } from "./storage.js"
import {not} from 'ramda';
import {defaultSketch, defaultShader} from './defaultState';
import {listAllMeshGist, disconnect, loadGistFile, isUserConnected, updateGist, createGist} from './githubConnection';

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
		return this.setState({shader: code}, state => saveCurrentShaderCode(state.shader));
	}

	updateShaderGraph (graph) {
		return this.setState({shaderGraph: graph}, state => saveCurrentShaderGraph(state.shaderGraph));
	}

	updateSketchName(name) {
		return this.setState({sketchName: name, isInDatabase: false});
	}


	//geometry
	///////////

	reloadGeometry () {
		return executeCode(this.state.currentCode,{print: this.log, clearConsole: this.clearConsole})
		.then(value => this.setState(value))
		.then((newState) => saveCurrentSketch(newState.sketchName, newState.currentCode, newState.shader))
		.catch(err => this.log(err, "error"));
	}


	//Save and Load
	////////////////

	loadSketch(sketch, isInDatabase) {
		if (sketch.gistId) {
			return this.loadSketchFromGist(sketch);
		} else {
			return this.loadSketchFromFile(sketch, isInDatabase)
		}
	}
	loadSketchFromGist(sketch, isInDatabase) {
		return loadGistFile(sketch.gistId)
		.then(sketch => this.loadSketchFromFile(sketch, true))
		return Promise.reject(new Error(sketch.toString() +" is not a valid sketch"));
	}
	loadSketchFromFile(sketch, isInDatabase) {
		var ss = a => this.setState(a, this.debouncedReloadGeometry);
		const shader = sketch.shader || defaultShader()
		if (sketch.code) {
			return ss({currentCode: sketch.code, sketchName: sketch.name, isInDatabase, shaderGraph: sketch.shaderGraph, shader});
		}
		if (sketch.content) {
			return ss({currentCode: sketch.content, sketchName: sketch.name, isInDatabase, shaderGraph: sketch.shaderGraph, shader});
		}
		if (sketch.codeUrl) {
			return fetch(sketch.codeUrl)
			.then(response => response.text())
			.then(str => ss({sketchName: sketch.name, currentCode: str, isInDatabase, shader}))
		}
		return Promise.reject(new Error(sketch.toString() +" is not a valid sketch"));
	}

	updateSavedSketch() {
		return updateSavedSketch().then(sketchesData => this.setState({savedSketches: sketchesData}));
	}

	saveSketch() {
		var p = saveSketch(this.state.sketchName, this.state.currentCode, this.state.shaderGraph)
		.then(this.updateSavedSketch);
		if (isUserConnected()) {
			p = p.then(() => {
				var saved = this.state.savedGist.find(_item => _item.name == this.state.sketchName);
				if (saved) {
					return updateGist(saved, this.state.sketchName, this.state.currentCode, this.state.shaderGraph);
				} else {
					return createGist(this.state.sketchName, this.state.currentCode, this.state.shaderGraph);
				}
			})
			.then(() => {
				this.initiateLogin();
			});
		}



		return p;
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


	//Connected 

	initiateLogin() {
		return listAllMeshGist().then((savedGist) => {
			console.log("savedGist");
			this.log("Connected !")
			return this.setState({connected: true, savedGist});
		})
		.catch(_err => {
			console.log(_err);
			this.log("Sorry, there was an error with the connection !")
		})
		
	}
	logout() {
		return disconnect().then(() => {
			this.log("Disconnected !");
			return this.setState({connected: false, savedGist: null});
		})
		
	}
}

export default Reducer;
