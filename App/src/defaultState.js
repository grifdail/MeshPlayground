export function getDefaultState() {
  return {
    sketchName: "newSketch"+Math.floor(Math.random()*100000),
    currentCode: `//Hello world
var box = new Box(10);
addFaces(box);
`,
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
    code: `//Hello world
var box = new Box(10);
addFaces(box);
`
  }
}
