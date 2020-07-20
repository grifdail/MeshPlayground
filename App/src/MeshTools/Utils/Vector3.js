import * as THREE from "three";
import {ParamError } from "../Error.js";

export const getVectorParams = (name, ...params) => {
  if (typeof params[0] === "object" && !isNaN(params[0].x * params[0].y * params[0].z)) {
    return [params[0].x, params[0].y, params[0].z];
  }
  if (!isNaN(params[0] * params[1] * params[2])) {
    return params;
  }
  if (!isNaN(params[0])) {
    return [params[0], params[0], params[0]]
  }

  throw new ParamError(name, ["vector"], params, 2);
}

/**
 * Class representing a point.
 * @tag vector
*/
export class Vector3 extends THREE.Vector3 {
  /**
    return the negative of a this vector (-x,-y,-z)
    @return {Vector3} a new Vector3
  */
  negative() {
    return new Vector3(-this.x, -this.y, -this.z);
  }
  /**
    Add a Vector3 or add a number to each component
    @param {vector} v
    @return {Vector3} a new Vector3
  */
  add(...params) {
    const [x,y,z] = getVectorParams("Vector3.add", ...params)
    return new Vector3(this.x + x, this.y + y, this.z + z);
  }
  /**
    Subtract a Vector3 or subtract a number to each component
    @param {Vector3} v
    @return {Vector3} a new Vector3
  */
  subtract(...params) {
    const [x,y,z] = getVectorParams("Vector3.subtract", ...params)
    return new Vector3(this.x - x, this.y - y, this.z - z);
  }
  /**
    Multiply two vector component wise.
    @param {Vector3} v
    @return {Vector3} a new Vector3
  */
  multiply(...params) {
    const [x,y,z] = getVectorParams("Vector3.multiply", ...params)
    return new Vector3(this.x * x, this.y * y, this.z * z);
  }
  /**
    Scale a vector by a number
    @param {number} a
    @return {Vector3} a new Vector3
  */
  scale(v) {
    if (typeof v !== "number") { throw new ParamError("Vector3.scale", ["number"], [v], 1);}
    return new Vector3(this.x * v, this.y * v, this.z * v);
  }
  /**
    Divide two Vector3 component wise
    @param {Vector3} v
    @return {Vector3} a new Vector3
  */
  divide(...params) {
    const [x,y,z] = getVectorParams("Vector3.divide", ...params)
    return new Vector3(this.x / x, this.y / y, this.z / z);
  }
  /**
    Check if this vector is equal to another
    @param {Vector3} v
    @return {boolean}
  */
  equals(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }
  /**
    returns the dot product of this vector with another
    @param {Vector3} v
    @return {number}
  */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  /**
    Return the cross product of this vector with another
    @param {Vector3} v
    @return {Vector3} a new Vector3
  */
  cross(v) {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }
  /**
    Return the magnitude / lenght of this vector
    @return {number}
  */
  length() {
    return Math.sqrt(this.dot(this));
  }
  /**
    Return the squared magnitude of a vector
    @return {number}
  */
  sqrMagnitude() {
    return this.x*this.x+this.y*this.y+this.z*this.z;
  }
  /**
    Return this vector such that it's length is equals to one;
    @return {Vector3} this vector
  */
  normalize() {
    return this.divide(this.length());
  }
  /**
    Return a normalized clone of this vector;
    @return {Vector3} a new vector;
  */
  unit() {
    return this.clone().divide(this.length());
  }
  /**
    Return the smallest component of this vector;
    @return {number}
  */
  min() {
    return Math.min(Math.min(this.x, this.y), this.z);
  }
  /**
    Return the biggest component of this vector;
    @return {number}
  */
  max() {
    return Math.max(Math.max(this.x, this.y), this.z);
  }
  /**
    Return the 3d angle formed by this vector
    @return {object} the angle is the form {theta: number, phi: number}.
  */
  toAngles() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    }
  }
  /**
    Return the angle between this vector and another;
    @param {Vector3} a
    @return {number}
  */
  angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  }
  /**
    Return this vector as an array [x,y,z];
    @return {array}
  */
  toArray(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  }
  /**
    Return a copy a this vector
    @return {Vector3}
  */
  clone() {
    return new Vector3(this.x, this.y, this.z);
  }
  /**
    Set this vector component based on another vector
    @return {Vector3}
  */
  set(...params) {
    const [x,y,z] = getVectorParams("Vector3.set", ...params)
    this.x = x; this.y = y; this.z = z;
    return this;
  }
  /**
    Return this vector as a string `Vector ( x: ... y: ... z : ... )`
    @return {string}
  */
  toString() {
    return `Vector ( x: ${this.x} y: ${this.y} z : ${this.z} )`;
  }
  multiplyQuaternion(q) {
    if(typeof q !== "object" || !q.isQuaternion) {
      throw new ParamError("Vector3.multiplyQuaternion", ["quaternion"], [q], 1);
    }
    return this.clone().applyQuaternion(q);
  }
  wqt() {

  }

  /**   Return new Vector3(x,x,x) */
  static all(x) {return new Vector3(x,x,x);}
  /**   Return new Vector3(1,1,1) */
  static one() {return new Vector3(1,1,1);}
  /**   Return new Vector3(0,0,0) */
  static zero() {return new Vector3(0,0,0);}
  /**   Return new Vector3(0,0,1) */
  static forward() {return new Vector3(0,0,1);}
  /**   Return new Vector3(0,0,-1) */
  static back() {return new Vector3(0,0,-1);}
  /**   Return new Vector3(0,1,0) */
  static up() {return new Vector3(0,1,0);}
  /**   Return new Vector3(0,-1,0) */
  static down() {return new Vector3(0,-1,0);}
  /**   Return new Vector3(-1,0,0) */
  static left() {return new Vector3(-1,0,0);}
  /**   Return new Vector3(1,0,0) */
  static right() {return new Vector3(1,0,0);}

  static isVector(v) {
    return typeof v === "object" && v.isVector3;
  }
  /**
    return the dot product between two vector
  */
  static dot(a,v) {
    if (!Vector3.isVector(a) || !Vector3.isVector(v)) {throw new ParamError("Vector3.dot", ["vector", "vector"], [a,v], 1);}
    return a.x * v.x + a.y * v.y + a.z * v.z;
  }

  static negative(a, b = Vector3.zero()) {
    b.x = -a.x; b.y = -a.y; b.z = -a.z;
    return b;
  }
  static add(a, b, c = Vector3.zero()) {
    if (b instanceof Vector3) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; }
    else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; }
    return c;
  }
  static subtract(a, b, c = Vector3.zero()) {
    if (b instanceof Vector3) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z; }
    else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b; }
    return c;
  }
  static multiply(a, b, c = Vector3.zero()) {
    if (b instanceof Vector3) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
    else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
    return c;
  }
  static divide(a, b, c = Vector3.zero()) {
    if (b instanceof Vector3) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; }
    else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; }
    return c;
  }
  static cross(a, b, c = Vector3.zero()) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
  }
  static unit(a, b = Vector3.zero()) {
    var length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    b.z = a.z / length;
    return b;
  }
  //return the unit vector formed by the angles theta (around the up axis) and phii
  static fromAngles(theta, phi) {
    return new Vector3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
  }
  //return a random vector3 of length 1;
  static randomDirection() {
    return Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
  }
  //return a vector defined but the smallest component of the two vector
  static min(a, b) {
    if (!Vector3.isVector(a) || !Vector3.isVector(b)) {throw new ParamError("Vector3.min", ["vector", "vector"], [a,b], 1);}
    return new Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  }
  //return a vector defined but the largest components of the two vector
  static max(a, b) {
    if (!Vector3.isVector(a) || !Vector3.isVector(b)) {throw new ParamError("Vector3.max", ["vector", "vector"], [a,b], 1);}
    return new Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  }
  //Interpolate between vector a and b by a value of 'fraction' (in the range [0,1])
  static lerp(a, b, fraction) {
    if (!Vector3.isVector(a) || !Vector3.isVector(b)) {throw new ParamError("Vector3.lerp", ["vector", "vector"], [a,b], 1);}
    return b.subtract(a).multiply(fraction).add(a);
  }
  //return a vector from an array [x,y,z];
  static fromArray(a) {
    return new Vector3(a[0], a[1], a[2]);
  }
  //return the absolute angle between a and b;
  static angleBetween(a, b) {
    if (!Vector3.isVector(a) || !Vector3.isVector(b)) {throw new ParamError("Vector3.angleBetween", ["vector", "vector"], [a,b], 1);}
    return a.angleTo(b);
  }
  //return the square of the distance between a and b;
  static sqrDistance(a, b) {
    if (!Vector3.isVector(a) || !Vector3.isVector(b)) {throw new ParamError("Vector3.sqrDistance", ["vector", "vector"], [a,b], 1);}
    return b.subtract(a).sqrMagnitude();
  }
  //returnthe distance between a and b;
  static distance(a, b) {
    if (!Vector3.isVector(a) || !Vector3.isVector(b)) {throw new ParamError("Vector3.distance", ["vector", "vector"], [a,b], 1);}
    return Math.sqrt(Vector3.sqrDistance(a,b));
  }
  //Lerp between 4 vector according to u and v parameters;
  static UVLerp(topLeft, topRight, bottomRight, bottomLeft, u, v) {
    return Vector3.lerp( Vector3.lerp(topLeft, topRight, u), Vector3.lerp(bottomLeft, bottomRight, u), v);
  }
  static fromArray([x,y,z]) {
    return new Vector3(x,y,z);
  }


  static projectOnPlane(v, a, b, c) {
    var ab = b.subtract(a).unit();
    var ac = c.subtract(a).unit();
    var av = v.subtract(a);
    var planeNormal = Vector3.cross(ab,ac).unit();
    var vab = av.dot(planeNormal);
    return v.subtract(planeNormal.scale(vab));
  }
}

Object.defineProperty(Vector3.prototype, "isVector", {configurable: false, enumerable: true, value: true, writable: false});
