import {DefaultVertexShader, DefaultFragmentShader} from './lib/shader-editor';

export function getDefaultState() {
  return {
    sketchName: "newSketch"+Math.floor(Math.random()*100000),
    currentCode: `//Hello world
var box = new Box(10);
addFaces(box);`,
    shader: defaultShader(),
    shaderGraph: {
      nodes: [],
      edges: []
    },
    geometry: null,
    console: [],
    savedSketches: [],
    camera: {
      autoRotate: true,
      reset: false
    },
  }
}

export function defaultSketch() {
  return {
    name: "newSketch"+Math.floor(Math.random()*100000),
    shader: defaultShader(),
    shaderGraph: {
      nodes: [],
      edges: []
    },
    code: `//Hello world
var box = new Box(10);
addFaces(box);
`
  }
}

export function defaultShader() {
 return {
   vertex: DefaultVertexShader,
   fragment:DefaultFragmentShader,

 };
}
