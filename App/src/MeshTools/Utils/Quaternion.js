import * as THREE from "three";
import {Vector3, getVectorParams} from "./Vector3.js"
import {ParamError} from "../Error.js";

/**
 * Represent a 3D rotation as a Quaternion.
 * @tag quaternion
*/
export class Quaternion extends THREE.Quaternion {

  static FromTHREEQuaternion(q) {
    return new Quaternion(q.x,q.y,q.z,q.w);
  }

  static identity() {
    return new Quaternion(0,0,0,1);
  }

  static Euler(...params) {
    const [x,y,z] = getVectorParams("Quaternion.Euler", ...params)
    return new Quaternion().setFromEuler(new THREE.Euler(x,y,z));
  }

  static AxisRotation(axis, rotation) {
    if (!Vector3.isVector(axis) || isNaN(rotation) ) {throw new ParamError("Quaternion.LookAt", ["vector", "number"], [axis, rotation], 1);}
    return new Quaternion().setFromAxisAngle(axis, rotation);
  }

  static LookAt(direction, axis = Vector3.forward()) {
    if (!Vector3.isVector(direction) || !Vector3.isVector(axis) ) {throw new ParamError("Quaternion.LookAt", ["vector", "vector (optional)"], [direction, axis], 1);}
    return new Quaternion().setFromUnitVectors(axis, direction.unit());
  }

  static slerp(q1,q2,v) {
    if (!Quaternion.isQuaternion(q1) || !Quaternion.isQuaternion(q2)) {throw new ParamError("Quaternion.slerp", ["quaternion", "quaternion"], [q1,q2], 1);}
    const q = THREE.Quaternion.slerp(q1,q2,new Quaternion(), v);
    return q;
  }

  static isQuaternion(q) {
    return typeof q === "object" && q.isQuaternion;
  }

  clone() {
    return new Quaternion(this.x,this.y,this.z,this.w);
  }

  multiply(q) {
    if (!Quaternion.isQuaternion(q)) {throw new ParamError("Quaternion.multiply", ["quaternion"], [q], 1);}
    return this.clone().multiply(q);
  }

  multiplyVector(v) {
    if (!Vector3.isVector(v)) {throw new ParamError("Quaternion.multiplyVector", ["vector"], [v], 1);}
    return v.clone().applyQuaternion(this);
  }
}
Object.defineProperty(THREE.Quaternion.prototype, "isQuaternion", {configurable: false, enumerable: true, value: true, writable: false});
//THREE.Quaternion.prototype.isQuaternion = true;
