import * as firebase from "firebase/app";
import "firebase/auth";
import Gists from "gists";

const TOKEN_STORAGE_KEY = "githubToken";

const firebaseConfig = {
	apiKey: "AIzaSyDP9g9DyIwOgLBp-SXncYXeYCidDGIKoHA",
	authDomain: "meshplayground.firebaseapp.com",
	databaseURL: "https://meshplayground.firebaseio.com",
	projectId: "meshplayground",
	storageBucket: "meshplayground.appspot.com",
	messagingSenderId: "30864291580",
	appId: "1:30864291580:web:f7ffe710005c6cc2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var gistApi;

export function githubLoginFlow() {
	var provider = new firebase.auth.GithubAuthProvider();
	provider.addScope('gist');
	return firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
		sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
		gistApi = new Gists({token: token});
		return gistApi;

	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  console.log(errorCode, errorMessage, email, credential);
	});
}

export function disconnect() {
	return firebase.auth().signOut()
		.catch(_err => console.log(_err) )
		.then(() => {
			gistApi = null;
			sessionStorage.removeItem(TOKEN_STORAGE_KEY)
		});
}

function getGistApi() {
	if (gistApi) {
		return Promise.resolve(gistApi);
	} else {
		if (isUserConnected()) {
			console.log(sessionStorage.getItem(TOKEN_STORAGE_KEY));
			gistApi = new Gists({token: sessionStorage.getItem(TOKEN_STORAGE_KEY)});
			return Promise.resolve(gistApi);
		} else {
			return githubLoginFlow();
		}
		
	}
}

function loadApiFromCurrentUser() {
	console.log(firebase.auth().currentUser);
	throw "Error";
}


export function listAllMeshGist() {
	return getGistApi()
	.then(api => api.all())
	.then(items => {
		
		var list = items.pages.map(page => page.body).flat()
		console.log(list);
		return list
			.filter(item => item.description && item.description.match(/^mesh-playground/))
			.map(rawGistData => ({
				name: getName(rawGistData),
				gistId: rawGistData.id
			}));
	})
}

export function isUserConnected() {
	return firebase.auth().currentUser != undefined && sessionStorage.getItem(TOKEN_STORAGE_KEY)
}

export function loadGistFile(gistId) {
	return getGistApi()
	.then(api => api.get(gistId))
	.then(item => item.body)
	.then(item => {
		console.log(item);
		return ({
			name: getName(item),
			code: item.files["mesh.js"] ? item.files["mesh.js"].content : "",
			shaderGraph: JSON.parse(item.files["shader.json"] ? item.files["shader.json"].content : "{}")
		})
	})
}

function getName(item) {
	return (item.description && item.description.replace(/^mesh-playground ?/, "")) || "Unnamed Gist";
}


export function updateGist(saved, sketchName, currentCode, shaderGraph) {
	return getGistApi()
	.then(api => api.edit(saved.gistId, {
  		"description": "mesh-playground "+sketchName,
  		"public": false,
  		"files": {
    		"mesh.js": {
      			"content": currentCode
    		},
    		"shader.json": {
      			"content": JSON.stringify(shaderGraph)
    		}
  		}
	}));
}

export function createGist(sketchName, currentCode, shaderGraph) {
	return getGistApi()
	.then(api => api.create({
  		"description": "mesh-playground "+sketchName,
  		"public": false,
  		"files": {
    		"mesh.js": {
      			"content": currentCode
    		},
    		"shader.json": {
      			"content": JSON.stringify(shaderGraph)
    		}
  		}
	}));
}