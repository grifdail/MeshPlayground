import {Mesh} from "../Mesh.js";

/** Create a mesh where each added face is duplicated 'count' time around 'axis'
@tag primitive
  @tag mesh
@tag modifier
*/
export class RotationalTransformedMesh extends Mesh {
  constructor(count, axis, color = 0xffffff) {
    super();
    this.setColor(color);
    var addFace = this.addFace.bind(this);
    this.addFace = (...arg) => {
      var matrix =  this._currentMatrix.clone();
      for(var i = 0; i<count; i++) {
        var  t = i/count*Math.PI*2
        this.push();
        this.resetMatrix();
        this.rotate(axis.x*t,axis.y*t,axis.z*t)
        this.multiplyMatrix(matrix);
        addFace(...arg);
        this.pop();
      }
    }
  }
}
