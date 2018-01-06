import React, {Component} from "react";
import {GraphDisplay} from './GraphDisplay.js';
import {GraphState} from '../State/GraphState.js';
import {EditorState} from '../State/EditorState.js';
import {map, reduce} from "ramda";

export class GraphEditor extends Component {

  graphChanges = [];
  editorChanges = [];



  _events = {
    onStartDragNode: (nodeName, originalPosition) => {
      this.editorChanges.push(EditorState.addDraggedNode(nodeName))
      this.editorChanges.push(EditorState.updateDrag(originalPosition.world))
    },
    onEndDragNode: () => {
        this.editorChanges.push(EditorState.endDrag());
    },
    onUpdateDrag: (newPosition) => {
      const op = this.props.editor.data.dragInitialPos;
      const selectedNode = this.props.editor.data.draggedItems;
      const delta = {x: newPosition.x - op.x, y: newPosition.y - op.y};
      this.graphChanges.push(GraphState.updateNodePosition(delta, selectedNode));
      this.editorChanges.push(EditorState.updateDrag(newPosition));
    },
    onUpdatePan: (newPosition) => {

      this.editorChanges.push(EditorState.updatePan(newPosition));
    },

    onMouseMove: (e) => {
      if (this.props.editor.data.draggedItems.length>=1) {
        this._events.onUpdateDrag(e.world);
      } else if(e.event.buttons & 4) {
        this.editorChanges.push(EditorState.updatePan(e.canvas));
      }
      this.editorChanges.push(EditorState.updateMousePosition(e));
    },
    onScroll: (e) => {
      this.editorChanges.push(EditorState.zoom(e.deltaY));
    },

    onAddNode: (pos, type) => {
      this.graphChanges.push(GraphState.createNode(pos, this.props.models[type]))
    },

    onClick: (e, state) => {
      //return this._events.onAddNode(e.canvas, state);
    },

    onClickPin: (node, input, output) => {
      if (this.props.editor.data.startingPin) {
        return this._events.onEndConnection(node, input, output);
      } else {
        return this._events.onStartConnection(node, input, output);
      }
    },

    onStartConnection: (node, input, output) => {
      this.editorChanges.push(EditorState.startConnection({node, input, output}));
    },

    onEndConnection: (node, input, output) => {
      const startingPin = this.props.editor.data.startingPin;
      if (startingPin.node === node) {
        return null;
      }
      var newNode = {node, input, output};
      this.graphChanges.push(GraphState.createEdge(startingPin, newNode, this.props.models, this.props.colorByType));
      this.editorChanges.push(EditorState.endConnection());
    },

    onRemoveEdge: (e) => {
      this.graphChanges.push(GraphState.removeEdge(e))
    },
    onRemoveNode: (e) => {
      this.graphChanges.push(GraphState.removeNode(e));
    },

    updateNodeParams: (nodeName, paramsName, value, state) => {
      this.graphChanges.push(GraphState.updateNodeParams(nodeName, paramsName, value, this.props.models));
    }
  }

  events = map(fn => (...args) => {
    this.graphChanges = [];
    this.editorChanges = [];
    fn(...args);
    if (this.graphChanges.length) {
      this.props.onGraphChange(reduce((old, {name, args}) => old[name].apply(old, args), this.props.graph, this.graphChanges));
    }
    if (this.editorChanges.length) {
      this.props.onEditorChange(reduce((old, {name, args}) => old[name].apply(old, args), this.props.editor, this.editorChanges));
    }
  }, this._events);

  getMouseEdge() {
    const {editor} = this.props;
    const {startingPin, mousePosition} = editor.data;
    return {
      from: startingPin.input ? mousePosition : startingPin,
      to : startingPin.input ? startingPin : mousePosition,
      name: "mouse",
      color: "blue"
    }
  }

  render() {
    const {fields, models, graph, editor, colorByType} = this.props;
    const {nodes, edges} = graph.data;
    const {startingPin, viewport} = editor.data;
    const displayEdges = startingPin ? [...edges,this.getMouseEdge()] : edges;
    return <GraphDisplay models={models} nodes={nodes} colorByType={colorByType} edges={displayEdges} events={this.events} fields={fields} viewport={viewport}/>
  }
}
