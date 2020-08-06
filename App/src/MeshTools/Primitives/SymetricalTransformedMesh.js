import {Mesh} from "../Mesh.js";

/** Create a mesh where each added face is duplicated symetricaly according to axis;
@tag primitive
  @tag mesh
@tag modifier
*/
export class SymetricalTransformedMesh extends Mesh {
  constructor(axis, color=0xffffff) {
    super();
    this.setColor(color)
    var addFace = this.addFace.bind(this);
    this.addFace = (...arg) => {
      var matrix =  this._currentMatrix.clone();
      addFace(...arg);
      this.push();
      this.resetMatrix();
      this.scale(axis.x,axis.y,axis.z)
      this.multiplyMatrix(matrix);
      addFace(...arg);
      this.pop();
    }
  }
}
