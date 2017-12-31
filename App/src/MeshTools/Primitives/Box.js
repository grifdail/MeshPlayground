import {Mesh} from "../Mesh.js";

import {Vector3} from "../Utils/Vector3.js"

/**
  Mesh of Box
  @property {Vector3} LTB position of the Left Top Back vertex;
  @property {Vector3} RTB position of the Right Top Back vertex;
  @property {Vector3} LTF position of the Left Top Front vertex;
  @property {Vector3} RTF position of the Right Top Front vertex;
  @property {Vector3} LBB position of the Left Bottom Back vertex;
  @property {Vector3} RBB position of the Right Bottom Back vertex;
  @property {Vector3} LBF position of the Left Bottom Front vertex;
  @property {Vector3} RBF position of the Right Bottom Front vertex;
  @tag mesh
  @tag primitive
*/
export class Box extends Mesh {
  /**
    Create a new Box
    @param {number} size
    @param {color} color
    @param {number} width scale of the box on the x axis
    @param {number} height scale of the box on the y axis
    @param {number} depth scale of the box on the z axis
  */
  constructor(size = 10, color = 0xffffff, width = 1, height = 1, depth = 1) {
    super();
    this.setColor(color);
    var i = size * 0.5;
    this.LTB = new Vector3(-i * width, +i * height, -i * depth);
    this.RTB = new Vector3(+i * width, +i * height, -i * depth);
    this.LTF = new Vector3(-i * width, +i * height, +i * depth);
    this.RTF = new Vector3(+i * width, +i * height, +i * depth);
    this.LBB = new Vector3(-i * width, -i * height, -i * depth);
    this.RBB = new Vector3(+i * width, -i * height, -i * depth);
    this.LBF = new Vector3(-i * width, -i * height, +i * depth);
    this.RBF = new Vector3(+i * width, -i * height, +i * depth);

    this.generateFaces();
  }
  /**
    Recalculate the face
    Use this if you want to modify the vertices position;
  */
  generateFaces() {
    this.clearFaces();
    this.addQuad(this.LTB, this.RTB, this.RBB, this.LBB);
    this.addQuad(this.LTF, this.LTB, this.LBB, this.LBF);
    this.addQuad(this.LTF, this.RTF, this.RTB, this.LTB);
    this.addQuad(this.RTB, this.RTF, this.RBF, this.RBB);
    this.addQuad(this.RTF, this.LTF, this.LBF, this.RBF);
    this.addQuad(this.LBB, this.RBB, this.RBF, this.LBF);
  }
}
