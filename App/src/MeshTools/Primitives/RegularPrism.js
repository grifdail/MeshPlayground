import {Mesh} from "../Mesh.js";
import * as THREE from "three";

const Vector3 = (...a) => new THREE.Vector3(...a);

/** A prism primitive
  @tag mesh
  @tag primitive
*/
export class RegularPrism extends Mesh {
  constructor(side = 25, size = 10, height = 10, color=0xffffff) {
    super();
    this.setColor(color);
    var top = Vector3(0,height*0.5,0);
    var bottom = Vector3(0,-height*0.5,0);
    for(var i = 0; i<side; i++) {
      var alpha = i/side*Math.PI*2;
      var beta = (i+1)/side*Math.PI*2
      var cosAlpha = Math.cos(alpha) * size;
      var sinAlpha = Math.sin(alpha) * size;
      var cosBeta = Math.cos(beta) * size;
      var sinBeta = Math.sin(beta) * size;
      var t1 = Vector3(cosAlpha, height*0.5, sinAlpha);
      var t2 = Vector3(cosBeta, height*0.5, sinBeta);
      var b1 = Vector3(cosAlpha, -height*0.5, sinAlpha);
      var b2 = Vector3(cosBeta, -height*0.5, sinBeta);
      this.addFace(top,t2,t1);
      this.addQuad(t1,t2,b2,b1);
      this.addFace(bottom, b1, b2);
    }
  }
}
