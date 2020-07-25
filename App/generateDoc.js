const espree = require('espree');
const fs = require("fs-extra");
const path = require("path");
const commentParse = require("comment-parser");
const {walk} = require("estree-walker");

const OUTPUT_FILE = "src/Data/doc.json";

const PARSE_OPTION = {
  attachComment: true,
  ecmaVersion:2017,
  sourceType:"module",
  ecmaFeatures: {
    experimentalObjectRestSpread: false
  }
}

const writeData = (destination => json => fs.writeFile(destination, JSON.stringify(json, null, 4)));
const parse = code => espree.parse(code,PARSE_OPTION);

const parseComment = comment => {
  if (comment.indexOf("*") === 0) {
    comment = "/*"+comment+"*/"
  } else {
    comment = "/** "+comment+"*/"
  }
  return commentParse(comment)[0];
}

const getTagsFromDoc = doc => {
  return doc.tags.filter(tag => tag.tag === "tag").map(item => item.name);
};

const getItemsFromDoc = (doc, tagType) => {
  return doc.tags.filter(tag => tag.tag === tagType).map(item => ({name:item.name,type:item.type,description:item.description}));
};

const parseName = node => {
  if(node.type === "Identifier") {
    return node.name;
  }
  if(node.type === "Literal") {
    return node.raw;
  }
  if (node.type === "MemberExpression") {
    return parseName(node.object)+"."+parseName(node.property)
  }
};

const parseParams = params => params.map(item => {
  if (item.type === "Identifier") {
    return {
      name: item.name,
      type: undefined,
      description: undefined,
    }
  } else if (item.type === "AssignmentPattern") {
    return {
      name: parseName(item.left),
      type: undefined,
      description: undefined,
      defaultValue: parseName(item.right)
    }
  }
  return null
})

const parseClass = (node,comment) => {
  var obj = {
    name: parseName(node.id),
    type:"class",
    superClass: null,
    description: null,
    tags: [],
    methodes: [],
    statics: [],
    properties: [],
    hidden: false,
  }
  if (node.superClass) {
    obj.superClass = parseName(node.superClass);
  }
  if (comment) {
    const jsdoc = parseComment(comment);
    if (jsdoc) {
      obj.description = jsdoc.description;
      obj.tags.push(...getTagsFromDoc(jsdoc));
      obj.properties = getItemsFromDoc(jsdoc, "property");
      obj.hidden = getItemsFromDoc(jsdoc, "hidden").length > 0;
    }
  }
  return obj;
}

const parseFunction = (node,comment, className, tags) => {
  var obj = {
    name: parseName(node.key || node.id),
    type:"function",
    description: null,
    tags: [...tags],
    params: [],
    alternateParams: [],
    returnValue: null,
    hidden: false
  }
  if (obj.name === "constructor") {
    obj.name = "new "+className;
  }
  if (comment) {
    const jsdoc = parseComment(comment);
    if (jsdoc) {
      obj.description = jsdoc.description;
      obj.tags.push(...getTagsFromDoc(jsdoc));
      obj.returnValue = getItemsFromDoc(jsdoc, "return")[0] || null;
      obj.params = getItemsFromDoc(jsdoc, "param");
      obj.alternateParams = getItemsFromDoc(jsdoc, "alternate");
      obj.hidden = getItemsFromDoc(jsdoc, "hidden").length > 0;

    }
  }
  const paramsNode = (node.value && node.value.params) || node.params
  if (paramsNode) {
    var params = parseParams(paramsNode);
    var maxLength = Math.max(obj.params.length, params.length);
    for(var i = 0; i<maxLength; i++) {
      obj.params[i] = Object.assign(params[i] || {}, obj.params[i] || {});
    }
  }
  return obj;
}

const parseGenericNode = (node, type, comment, tags) => {
  var obj = {
    name: parseName(node.key || node.id || {}),
    type:type,
    description: null,
    tags: [...tags],
    params: [],
    alternateParams: [],
    returnValue: null,
    hidden: false
  }
  if (comment) {
    const jsdoc = parseComment(comment);
    if (jsdoc) {
      obj.description = jsdoc.description;
      obj.tags.push(...getTagsFromDoc(jsdoc));
      obj.hidden = getItemsFromDoc(jsdoc, "hidden").length > 0;
    }
  }
  return obj;
}


const parseNode = ast => {
  var doc = [];
  let currentClass = null;
  let parentTags = [];
  const enter = function(node, parent) {
    if (parent == null) {
      parent = {};
    }
    const comment = (node.leadingComments || parent.leadingComments || [{value:null}])[0].value;
    if (node.type === "ClassDeclaration") {
      let classDefinition = parseClass(node, comment, parentTags);
      currentClass = classDefinition;
      parentTags = classDefinition.tags;
      doc.push(classDefinition);
      return;
    }
    if (node.type === "MethodDefinition") {
      let fnDefinition =parseFunction(node, comment, currentClass.name, parentTags);
      if (node.static) {
        currentClass.statics.push(fnDefinition);
      } else {
        currentClass.methodes.push(fnDefinition);
      }
      this.skip();
      return
    }
    if (node.type === "Property" && node.value.type==="FunctionExpression") {
      let fnDefinition = parseFunction(node, comment,null, parentTags);
      doc.push(fnDefinition);
      this.skip();
      return;
    }
    if (node.type === "FunctionDeclaration") {
      let fnDefinition = parseFunction(node, comment,null, parentTags);
      doc.push(fnDefinition);
      this.skip();
      return;
    }
    if (node.type === "Property") {
      let fnDefinition = parseGenericNode(node, "constant", comment, parentTags);
      doc.push(fnDefinition);
      this.skip();
      return;
    }
    if (node.type === "VariableDeclaration" && node.declarations[0].init && node.declarations[0].init.type === "ObjectExpression") {
      let fnDefinition = parseGenericNode(node, "constant", comment, parentTags);
      parentTags = fnDefinition.tags;
      return;
    }

  };
  const leave = (node, parent) => {
    if (node.type === "ClassDeclaration") {
      currentClass = null;
      parentTags = [];
    }

    if (node.type === "VariableDeclaration" && node.declarations[0].init && node.declarations[0].init.type === "ObjectExpression") {
      parentTags = [];
      return;
    }
  }


  walk(ast,{ enter, leave});
  return doc;
}
const parseFile = url => fs.readFile(url)
  .then(parse)
  .then(parseNode,err=> {
    console.log("error with "+url);
    console.error(err);
    return [];
  });


fs.readFile(path.join(__dirname,"src", "MeshTools","Utils", "Utils.js"))
  .then(parse)
  .then(writeData("output.json")).catch(err => console.error(err));


var staticDoc = [
  {
    name:"print",
    type:"function",
    description:"print anything to the console",
    params:[{type:"",name:"anything"}],
    alternateParams:[],
    returnValue:[],
    tags:["log","debug"]
  }
];

console.log("Starting doc generation");
Promise.all([
  parseFile(path.join(__dirname,"src","MeshTools", "MathExtensions.js")),
  parseFile(path.join(__dirname,"src","MeshTools","Utils", "Vector3.js")),
  parseFile(path.join(__dirname,"src","MeshTools","Utils", "Quaternion.js")),
  parseFile(path.join(__dirname,"src","MeshTools","Utils", "Color.js")),
  parseFile(path.join(__dirname,"src","MeshTools","Mesh.js")),
  parseFile(path.join(__dirname,"src","MeshTools","GeneratorContext.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","Box.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","ParametricMesh.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","ParametricSphere.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","RegularPrism.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","RotationalTransformedMesh.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","SymetricalTransformedMesh.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","VoxelizedVolume.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","ConvexVolume.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","IcoSphere.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","MarchingCubeVolume.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Primitives","ComplexPrismMesh.js")),
  parseFile(path.join(__dirname,"src","MeshTools", "Utils","Utils.js")),
  staticDoc
]).then(([
  MathExtensions,
  Vector3,
  Quaternion,
  Color,
  Mesh,
  GeneratorContext,
  Box,
  ParametricMesh,
  ParametricSphere,
  RegularPrism,
  RotationalTransformedMesh,
  SymetricalTransformedMesh,
  VoxelizedVolume,
  ConvexVolume,
  MarchingCubeVolume,
  ComplexPrismMesh,
  Utils,
  staticDoc
]) => {
  return [
    ...Mesh[0].methodes,
    ...GeneratorContext[0].methodes,
    ...MathExtensions,
    ...Vector3,
    ...Quaternion,
    ...Color,
    ...Mesh,
    ...Box,
    ...ParametricMesh,
    ...ParametricSphere,
    ...RegularPrism,
    ...RotationalTransformedMesh,
    ...SymetricalTransformedMesh,
    ...VoxelizedVolume,
    ...ConvexVolume,
    ...MarchingCubeVolume,
    ...ComplexPrismMesh,
    ...Utils,
    ...staticDoc
  ]
})
.then(writeData(OUTPUT_FILE))
  .catch(err => console.error(err))
  .then(() => console.log(`Doc generated at "${OUTPUT_FILE}"`));
