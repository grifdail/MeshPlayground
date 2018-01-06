

const list = [
  require('./const/number.js').default,
  require('./const/vector3.js').default,

  require('./inputs/time.js').default,
  require('./inputs/normal.js').default,
  require('./inputs/color.js').default,
  require('./inputs/position.js').default,

  require('./math/addition.js').default,
  require('./math/division.js').default,
  require('./math/multiplication.js').default,
  require('./math/subtraction.js').default,
  require('./math/modulo.js').default,
  require('./math/cos.js').default,
  require('./math/arccos.js').default,
  require('./math/sin.js').default,
  require('./math/arcsin.js').default,
  require('./math/tan.js').default,
  require('./math/arctan.js').default,
  require('./math/arctan2.js').default,
  require('./math/min.js').default,
  require('./math/max.js').default,
  require('./math/absolute.js').default,
  require('./math/lerp.js').default,
  require('./math/clamp.js').default,
  require('./math/floor.js').default,

  require('./vector3/compose.js').default,
  require('./vector3/decompose.js').default,
  require('./vector3/addition.js').default,
  require('./vector3/division.js').default,
  require('./vector3/multiplication.js').default,
  require('./vector3/subtraction.js').default,
  require('./vector3/cross.js').default,
  require('./vector3/dot.js').default,
  require('./vector3/length.js').default,
  require('./vector3/lerp.js').default,

  require('./shading/lambert.js').default,


  require('./hidden/output.js').default,
]

const defaultNode = {
  name: "ERROR",
  category: "---",
  canBeDestroyed: true,
  canBeCreated: true,
  inputs: [],
  outputs: [],
  params: [],
  getOutputType() {return this.outputs},
  toGLSL: () => "",
  requireUniform: () => ""
}


export const models = list.reduce((old, n) => {
  old[n.name] = Object.assign({}, defaultNode, n);
  return old;
}, {});
