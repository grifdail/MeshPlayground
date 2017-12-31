import {Mesh} from "../Mesh.js";


/**
  Represent a plane transformed according to a parametric function
  @tag mesh
  @tag primitive
*/
export class ParametricMesh extends Mesh {
  /**
    Create a new ParametricMesh
    @param {number} sizeX number of subdivision on the horizontal axis
    @param {number} sizeY number of subdivision on the vertical axis
    @param {function} fn function that take u and v parameters and return a vector3
    @param {color} color color of the mesh
  */
  constructor(sizeX, sizeY, callback, color = 0xffffff) {
    super();
    this.setColor(color);
    var vertices = [];
    for (var y = 0; y <= sizeY; y++) {
      for(var x = 0; x <= sizeX;x++) {
        var vertex = callback(1-x/sizeX, y/sizeY);
        vertices.push(vertex);
        if (x>=1 && y>=1) {
          var v1 = vertices[x-1+(y-1)*(sizeX+1)];
          var v2 = vertices[x-0+(y-1)*(sizeX+1)];
          var v4 = vertices[x-1+y*(sizeX+1)];
          var v3 = vertices[x-0+y*(sizeX+1)];
          if ((x+y)%2) {
            this.addFace(v1,v2,v3);
            this.addFace(v1,v3,v4);
          } else {
            this.addFace(v2,v3,v4);
            this.addFace(v2,v4,v1 );
          }
        }
      }
    }
  }
}
