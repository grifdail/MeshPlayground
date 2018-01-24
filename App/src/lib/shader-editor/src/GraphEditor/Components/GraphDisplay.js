import React, {Component} from 'react';
import "./GraphDisplay.css"
import {Node} from "./Node.js";
import {Edge} from "./Edge.js";
import {AddContextMenu} from "./AddContextMenu.js";
import {HEADER_HEIGHT, PIN_HEIGHT, NODE_WIDTH} from "../StyleConstant.js";
import { ContextMenuTrigger } from "react-contextmenu";
import { Group } from "./Group.js";

function GetPinPosition(pin, nodes, models) {
  if(!pin.node) {
    return pin;
  }
  const node = nodes.find(_value => _value.name === pin.node);
  if (!node) {
    throw new Error(`Node ${pin.node} cannot be found.`)
  }
  const model = models[node.type];
  const pins = pin.input ? model.inputs : model.getOutputType(node.inputsTypes, node.params);
  const pos = pins.findIndex(_value => (_value.name === pin.input || _value.name === pin.output));
  return {
    x: node.position.x + (pin.input ? 0 : NODE_WIDTH) ,
    y: node.position.y + HEADER_HEIGHT + pos * PIN_HEIGHT + PIN_HEIGHT * 0.5
  };
}

export class GraphDisplay extends Component {

  mouseHelper = e => {
    const rect = this.refs.root.getBoundingClientRect();
    //console.log( e.clientX);
    const zoom = this.props.viewport.zoom;
    return ({
      canvas: {
        x: e.clientX - rect.x,
        y: e.clientY - rect.y
      },
      world: {
        x: (e.clientX - rect.x)/zoom - this.props.viewport.x,
        y: (e.clientY - rect.y)/zoom - this.props.viewport.y
      },
      event: e
    })
  };

  onMouseMove = (e) => {
    if (this.props.events) {
      this.props.events.onMouseMove(this.mouseHelper(e));
    }

  };

  onClick = (e) => {
    if (e.target === this.refs.root) {
      e.stopPropagation();
      if (this.props.events) {
        this.props.events.onClick(this.mouseHelper(e));
      }
    }
  };

  createAddNode = type => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.events.onAddNode(this.mouseHelper(e).world, type);
  };

  render() {
    const {nodes, models, edges, events, fields, viewport, colorByType} = this.props;
    return (
      <div>
      <ContextMenuTrigger  id="add-context-menu" holdToDisplay={-1}>
        <svg className="surface" ref="root" onMouseMove={this.onMouseMove} onMouseUp={this.onClick} onWheel={events.onScroll} >
          <Group x={viewport.x} y={viewport.y} scaleX={viewport.zoom} scaleY={viewport.zoom}>
            {
              edges.map((node, i)=>
                <Edge
                  key={"edge"+i}
                  name={node.name}
                  from={GetPinPosition(node.from, nodes, models)}
                  to={GetPinPosition(node.to, nodes, models)}
                  color={node.color} events={events}
                />
              )
            }
            {
              nodes.map((node, i)=>
                <Node
                  key={"node"+i}
                  node={node}
                  model={models[node.type]}
                  events={events}
                  mouseHelper={this.mouseHelper}
                  fields={fields}
                  colorByType={colorByType}
                />
              )
            }
            
          </Group>

          </svg>
      </ContextMenuTrigger>

      <AddContextMenu id="add-context-menu" models={models} createAddNode={this.createAddNode} />
    </div>
    );
  }
}
