import {Mesh} from "../Mesh.js";
import * as THREE from "three";

import {Vector3} from "../Utils/Vector3.js";


/** 
A basic sphere
@tag primitive
  @tag mesh
*/
export class IcoSphere extends Mesh {
  constructor(radius = 10, subdivisions = 0, color = 0xffffff) {
    super();
    this.setColor(color);
    this.push();
    this.scale(radius, radius, radius);
    var data = icosphere(subdivisions);
    data.cells.forEach(_face => {
      var v1 =  Vector3.fromArray(data.positions[_face[0]]);
      var v2 =  Vector3.fromArray(data.positions[_face[1]]);
      var v3 = Vector3.fromArray(data.positions[_face[2]]);
      this.addFace(v1, v2, v3, getUv(v1), getUv(v2), getUv(v3));
    });
    this.pop();
  }
}

/**
    @hidden
  */ 
function cartesianToPolar( coord ) {

  var lon = Math.atan2( coord.x, -coord.z ) * 180/Math.PI
  var length = Math.sqrt( coord.x * coord.x + coord.z * coord.z )
  var lat = Math.atan2( coord.y, length ) * 180/Math.PI

  return [ lon, lat ]

}
/**
    @hidden
  */ 
function getUv( coord ) {

  var [ lon, lat ] = cartesianToPolar(coord);

  return new Vector3(lon/360, 0.5+lat/180,0)

}
/**
    @hidden
  */ 
function icosphere(subdivisions) {
  subdivisions = +subdivisions|0

  var positions = []
  var faces = []
  var t = 0.5 + Math.sqrt(5) / 2

  positions.push([-1, +t,  0])
  positions.push([+1, +t,  0])
  positions.push([-1, -t,  0])
  positions.push([+1, -t,  0])

  positions.push([ 0, -1, +t])
  positions.push([ 0, +1, +t])
  positions.push([ 0, -1, -t])
  positions.push([ 0, +1, -t])

  positions.push([+t,  0, -1])
  positions.push([+t,  0, +1])
  positions.push([-t,  0, -1])
  positions.push([-t,  0, +1])

  faces.push([0, 11, 5])
  faces.push([0, 5, 1])
  faces.push([0, 1, 7])
  faces.push([0, 7, 10])
  faces.push([0, 10, 11])

  faces.push([1, 5, 9])
  faces.push([5, 11, 4])
  faces.push([11, 10, 2])
  faces.push([10, 7, 6])
  faces.push([7, 1, 8])

  faces.push([3, 9, 4])
  faces.push([3, 4, 2])
  faces.push([3, 2, 6])
  faces.push([3, 6, 8])
  faces.push([3, 8, 9])

  faces.push([4, 9, 5])
  faces.push([2, 4, 11])
  faces.push([6, 2, 10])
  faces.push([8, 6, 7])
  faces.push([9, 8, 1])

  var complex = {
      cells: faces
    , positions: positions
  }

  while (subdivisions-- > 0) {
    complex = subdivide(complex)
  }

  positions = complex.positions
  for (var i = 0; i < positions.length; i++) {
    normalize(positions[i])
  }

  return complex
}


/**
  @hidden
*/
function subdivide(complex) {
  var positions = complex.positions
  var cells = complex.cells

  var newCells = []
  var newPositions = []
  var midpoints = {}
  var f = [0, 1, 2]
  var l = 0

  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i]
    var c0 = cell[0]
    var c1 = cell[1]
    var c2 = cell[2]
    var v0 = positions[c0]
    var v1 = positions[c1]
    var v2 = positions[c2]

    var a = getMidpoint(v0, v1)
    var b = getMidpoint(v1, v2)
    var c = getMidpoint(v2, v0)

    var ai = newPositions.indexOf(a)
    if (ai === -1) {
      ai = l++;
      newPositions.push(a);
    }
    var bi = newPositions.indexOf(b)
    if (bi === -1) {
      bi = l++;
      newPositions.push(b);
    }
    var ci = newPositions.indexOf(c)
    if (ci === -1) {
      ci = l++;
      newPositions.push(c);
    }

    var v0i = newPositions.indexOf(v0)
    if (v0i === -1) {
      v0i = l++;
      newPositions.push(v0);
    }
    var v1i = newPositions.indexOf(v1)
    if (v1i === -1) {
      v1i = l++;
      newPositions.push(v1);
    }
    var v2i = newPositions.indexOf(v2)
    if (v2i === -1) {
      v2i = l++;
      newPositions.push(v2);
    }

    newCells.push([v0i, ai, ci])
    newCells.push([v1i, bi, ai])
    newCells.push([v2i, ci, bi])
    newCells.push([ai, bi, ci])
  }

  return {
      cells: newCells
    , positions: newPositions
  }

  // reuse midpoint vertices between iterations.
  // Otherwise, there'll be duplicate vertices in the final
  // mesh, resulting in sharp edges.
  function getMidpoint(a, b) {
    var point = midpoint(a, b)
    var pointKey = pointToKey(point)
    var cachedPoint = midpoints[pointKey]
    if (cachedPoint) {
      return cachedPoint
    } else {
      return midpoints[pointKey] = point
    }
  }

  function pointToKey(point) {
    return point[0].toPrecision(6) + ','
         + point[1].toPrecision(6) + ','
         + point[2].toPrecision(6)
  }

  function midpoint(a, b) {
    return [
        (a[0] + b[0]) / 2
      , (a[1] + b[1]) / 2
      , (a[2] + b[2]) / 2
    ]
  }
}

/**
    @hidden
  */ 
function normalize(vec) {
  var mag = 0
  for (var n = 0; n < vec.length; n++) {
    mag += vec[n] * vec[n]
  }
  mag = Math.sqrt(mag)

  // avoid dividing by zero
  if (mag === 0) {
    return Array.apply(null, new Array(vec.length)).map(Number.prototype.valueOf, 0)
  }

  for (var n = 0; n < vec.length; n++) {
    vec[n] /= mag
  }

  return vec
}
