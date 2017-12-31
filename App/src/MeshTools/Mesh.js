import {memoize} from "../utils.js";
import {Vector3, getVectorParams} from "./Utils/Vector3.js";
import {Quaternion} from "./Utils/Quaternion.js";
import {Color} from "./Utils/Color.js";
import {ParamError} from "./Error.js";
import * as THREE from "three";

var uv = (x,y) => new THREE.Vector2(x,y);

/** Represent a 3D mesh
  @tag mesh
*/
export class Mesh {
  /**
    create a new Mesh.
  */
  constructor() {
    this._currentColor =  new Color(0xffffff);
    this._faces = [];
    this._currentMatrix = new THREE.Matrix4();
    this._matrixStack = [];
  }

  /**
    Set the color for the next faces added to the mesh;
    @param {color} color
  */
  setColor(...args) {
    this._currentColor = new Color(...args);
  }
  /**
    Return the currentColor of the mesh
  */
  getColor() {
    return this._currentColor;
  }
  /**
    Set the color of all of the mesh's triangle;
    @param {color} color
  */
  changeColor(...params) {
    const c = new Color(...params);
    this.mapFaces(a => {a.color = c; return a;});
  }

  /**
    Add a new triangle to the mesh
    the vertice need to be specified in a clockwise orded for the triangle to face the right way
    @param {vector} v1
    @param {vector} v2
    @param {vector} v3
    @param {vector} uv1 the uv coordinate of the first vertice
    @param {vector} uv2 the uv coordinate of the second vertice
    @param {vector} uv3 the uv coordinate of the last vertice
  */
  addFace(v1, v2, v3, uv1 = uv(0,0), uv2 = uv(1,0), uv3 = uv(1,1), c) {
    var translate = new THREE.Vector3();
    var rotation = new THREE.Quaternion();
    var scale = new THREE.Vector3();
    this._currentMatrix.decompose(translate, rotation, scale);
    var sign = scale.x*scale.y*scale.z;
    if (sign<0) {
      [v1,v2] = [v2, v1];
    }
    var tp = n => n.clone().applyMatrix4(this._currentMatrix);
    this._faces.push({v1:tp(v1) , v2:tp(v2), v3:tp(v3), uv1, uv2, uv3, color: c || this._currentColor, isFace: true});
  }

  /**
    Add two triangle to the mesh such that they form a quadrilater
    the vertice need to be specified in a clockwise orded for the quad to face the right way
    @param {vector} v1
    @param {vector} v2
    @param {vector} v3
    @param {vector} v4
    @param {vector} uv1 the uv coordinate of the first vertice
    @param {vector} uv2 the uv coordinate of the second vertice
    @param {vector} uv3 the uv coordinate of the third vertice
    @param {vector} uv4 the uv coordinate of the last vertice
  */
  addQuad(a,b,c,d, uv1 = uv(0,0), uv2 = uv(1,0), uv3 = uv(1,1), uv4 = uv(0,1)) {
    this.addFace(a,b,c, uv1, uv2, uv3);
    this.addFace(a,c,d, uv1, uv3, uv4);
  }
  /**
    Add another mesh faces to this mesh.
    all transformation are applied;
    @param {mesh} mesh Can also be an array of faces
  */
  addFaces(faces) {
    if (faces._faces) {
      faces = faces._faces
    }
    faces.forEach(a => this.addFace(a.v1, a.v2, a.v3, a.uv1, a.uv2, a.uv3, a.color));
  }
  addMesh(mesh, position = Vector3.zero(), rotation = Quaternion.identity(), scale = Vector3.one()) {
    if (!Vector3.isVector(position) || !Quaternion.isQuaternion(rotation) || !Vector3.isVector(scale)) {
      throw new ParamError("setPositionRotationScale", ["mesh", "vector", "quaternion","vector"], [mesh, position, rotation, scale])
    }
    this.push();
    this.translate(position.negative());
    this.rotate(rotation);
    this.scale(scale);
    this.addFaces(mesh);
    this.pop();
  }
  /**
    Remove all the triangles of this mesh
  */
  clearFaces() {
    this._faces = [];
  }
  /**
    Inverse the direction of all of the triangles
  */
  inverseNormals() {
    this._faces.forEach(f => {
      var temp = f.v2;
      f.v2 = f.v3;
      f.v3 = temp;
    })
  }
  /**
    Apply a function to all of the vertex in this mesh
    @param {function} fn take a vertex and return a new transformed vertex;
    @param {boolean} eachOne if set to false, the function can be call multiple time for the same vertex
  */
  mapVertices(fn, eachOne = true) {
    if (eachOne) {
      fn = memoize(fn, ([a], [b]) => Vector3.sqrDistance(a,b)< 0.001 )
    }
    this._faces.forEach(face => {
      face.v1 = fn(face.v1);
      face.v2 = fn(face.v2);
      face.v3 = fn(face.v3);
    });
  }
  /**
    Apply a transform function to all of the faces in this mesh;
    @param {function} fn take a face object and return a new face object;
  */
  mapFaces(fn) {
    this._faces = this._faces.map(fn);
  }

  /**
    Reset the transform matrix of the mesh (to identity)
    @tag transform
  */
  resetMatrix() {
    this._currentMatrix.identity();
  }
  /**
    Set the transform matrix of this to M
    @param {Matrix4} m
    @tag transform
  */
  setMatrix(m) {
    this.currentMatrix.copy(m);
  }
  /**
    Set the transform matrix of this mesh to the matrix representing position, rotation and scale
    @param {Vector3} position
    @param {Quaternion} rotation
    @param {Vector3} scale
    @tag transform
  */
  setPositionRotationScale(position, rotation, scale) {
    if (!Vector3.isVector(position) || !Quaternion.isQuaternion(rotation) || !Vector3.isVector(scale)) {
      throw new ParamError("setPositionRotationScale", ["vector", "quaternion","vector"], [position, rotation, scale])
    }
    this._currentMatrix.compose(position, rotation, scale);
  }
  /**
    Translate the transform matrix by a vector or by this coordinate
    @param {number} x
    @alternate {Vector3} vector
    @tag transform
  */
  translate(...params) {
    const [x,y,z] = getVectorParams("translate", ...params);
    this._currentMatrix.multiply((new THREE.Matrix4()).makeTranslation(x, y, z))

  }
  /**
    Rotate the transform matrix by the rotation given by the Euler angles
    @param {number} x
    @param {number} y
    @param {number} z
    @tag transform
  */
  rotate(...params) {
    if (Quaternion.isQuaternion(params[0])) {
      this._currentMatrix.multiply((new THREE.Matrix4()).makeRotationFromQuaternion(params[0]))
      return;
    }
    const [x,y,z] = getVectorParams("rotate",...params);
    this._currentMatrix.multiply((new THREE.Matrix4()).makeRotationFromEuler(new THREE.Euler(x,y,z)))
  }
  /**
    Scale the transform matrix by a vector or by this coordinate
    @param {number} x
    @param {number} y
    @param {number} z
    @alternate {Vector3} vector
    @tag transform
  */
  scale(...params) {
    const [x,y,z] = getVectorParams("scale", ...params);
    this._currentMatrix.multiply((new THREE.Matrix4()).makeScale(x, y, z))
  }
  /**
    multiply the transform matrix by another matrix
    @param {Matrix4} matrix
    @tag transform
  */
  multiplyMatrix(m) {
    this._currentMatrix.multiply(m);
  }
  /**
    Save the currentMatrix to the stack. Use pop to bring it back
    @tag transform
  */
  push() {
    this._matrixStack.push(this._currentMatrix.clone())
  }
  /**
    Set the transform matrix to the lastest saved
    @tag transform
  */
  pop() {
    if (this._matrixStack.length) {
      this._currentMatrix.copy(this._matrixStack.pop());
    } else {
      this.resetMatrix();
    }
  }
  /**
    Generate the actual geometry;
    @hidden
  */
  _generateMesh() {
    this._generateMeshFlat();
  }
  /**
    Generate the actual geometry;
    @hidden
  */
  _generateMeshFlat() {
    var geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    //var faceCount = this._faces.length*3*3;

    var positions = [];
    var normals = [];
    var colors = [];
    var uvs = []
    var i = 0;
    var uvi = 0
    this._faces.forEach(item => {
      let faceNormal = new THREE.Vector3(0,0,0).crossVectors( new THREE.Vector3().subVectors(item.v2, item.v1),  new THREE.Vector3().subVectors(item.v3, item.v1));
      positions[i+0] = item.v1.x;
      positions[i+1] = item.v1.y;
      positions[i+2] = item.v1.z;
      colors[i+0] = item.color.r;
      colors[i+1] = item.color.g;
      colors[i+2] = item.color.b;
      normals[i+0] = faceNormal.x;
      normals[i+1] = faceNormal.y;
      normals[i+2] = faceNormal.z;
      uvs[uvi+0] = item.uv1.x;
      uvs[uvi+1] = item.uv1.y;
      uvi+=2;
      i+=3;
      positions[i+0] = item.v2.x;
      positions[i+1] = item.v2.y;
      positions[i+2] = item.v2.z;
      colors[i+0] = item.color.r;
      colors[i+1] = item.color.g;
      colors[i+2] = item.color.b;
      normals[i+0] = faceNormal.x;
      normals[i+1] = faceNormal.y;
      normals[i+2] = faceNormal.z;
      uvs[uvi+0] = item.uv2.x;
      uvs[uvi+1] = item.uv2.y;
      uvi+=2;
      i+=3;
      positions[i+0] = item.v3.x;
      positions[i+1] = item.v3.y;
      positions[i+2] = item.v3.z;
      colors[i+0] = item.color.r;
      colors[i+1] = item.color.g;
      colors[i+2] = item.color.b;
      normals[i+0] = faceNormal.x;
      normals[i+1] = faceNormal.y;
      normals[i+2] = faceNormal.z;
      uvs[uvi+0] = item.uv3.x;
      uvs[uvi+1] = item.uv3.y;
      uvi+=2;
      i+=3;
    })

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
    return geometry;
  }
  /**
    Generate the actual geometry;
    @hidden
  */
  _generateMeshIndexed() {
    var geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    //var faceCount = this._faces.length*3*3;
    const getVectorHash = v=> `x${Math.floor(v.x*1000)}y${Math.floor(v.y*1000)}z${Math.floor(v.z*1000)}`;
    const vertexMap = {}
    var indexes = [];
    var positions = [];
    var normals = [];
    var colors = [];
    var uvs = []
    var i = 0;
    const addVertex = (v, normal, color, uv) => {
      const key = getVectorHash(v);
      let count, vNormals, vColors, index;
      if (vertexMap[key]) {
        count = vertexMap[key].count++;
        vColors = vertexMap[key].colors
        vNormals = vertexMap[key].normals
        vNormals.push(normal);
        vColors.push(color);
        index = vertexMap[key].index;
      } else {
        vNormals = [normal];
        vColors = [color];
        count = 1;
        index = i++;
        const obj = {count, index, normals: vNormals, colors: vColors , vector: v, uv};
        vertexMap[key] = obj;
      }
      const ii = index*3;
      positions[ii+0] = v.x;
      positions[ii+1] = v.y;
      positions[ii+2] = v.z;
      colors[ii+0] = vColors.reduce((s,j) => s+j.r/count, 0);
      colors[ii+1] = vColors.reduce((s,j) => s+j.g/count, 0);
      colors[ii+2] = vColors.reduce((s,j) => s+j.b/count, 0);
      const n = vNormals.reduce((s,j) => s.add(j)).normalize();
      normals[ii+0] = n.x;
      normals[ii+1] = n.y;
      normals[ii+2] = n.z;
      uvs[index*2+0] = uv.x;
      uvs[index*2+1] = uv.y;
      return index;
    }


    this._faces.forEach(item => {
      let faceNormal = new THREE.Vector3(0,0,0).crossVectors( new THREE.Vector3().subVectors(item.v2, item.v1),  new THREE.Vector3().subVectors(item.v3, item.v1));
      indexes.push(
        addVertex(item.v1, faceNormal, item.color, item.uv1),
        addVertex(item.v2, faceNormal, item.color, item.uv2),
        addVertex(item.v3, faceNormal, item.color, item.uv3)
      );
    })
    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
    geometry.setIndex( new THREE.Uint16BufferAttribute( indexes, 1 ) );
    return geometry;
  }
}
