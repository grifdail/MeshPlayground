import React, { Component } from 'react';
import './css/App.css';

import Editor from "./Editor.js";
import Toolbar from "./Toolbar.js";

import {getDefaultState} from "../defaultState.js"
import Reducer from "../reducer.js"
import Mousetrap from 'mousetrap'

class App extends Component {
  constructor() {
    super();
      this.state = getDefaultState();
     this.reducer = this.createReducer();
  }

  createReducer() {
    return new Reducer(this);
  }
  componentDidMount() {
    this.reducer.updateSavedSketch()
    .then(this.reducer.loadLastValidSketch)
    .then(() => {
      this.reducer.reloadGeometry();
    });
    Mousetrap.bind(["ctrl+s", "command+s"], () => {this.reducer.saveSketch(); return false});
  }


  render() {
    return (
      <div className="App">
        <Toolbar reducer={this.reducer} {...this.state} />
        <Editor reducer={this.reducer} {...this.state} />
      </div>
    );
  }
}

export default App;
