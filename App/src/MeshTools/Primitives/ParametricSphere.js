import {ParametricMesh} from "./ParametricMesh.js";
import * as THREE from "three";

import {Vector3} from "../Utils/Vector3.js";

/** A basic sphere
@tag primitive
  @tag mesh
*/
export class ParametricSphere extends ParametricMesh {
  constructor(sizeX = 10, sizeY = 10, radius = 10, color = 0xffffff) {
    super(sizeX, sizeY, (u,v) => {
      u = u*Math.PI*2
      v = v*Math.PI-Math.PI*0.5
      return new Vector3(radius * Math.cos(u) * Math.cos(v), Math.sin(v) * radius, radius * Math.sin(u) * Math.cos(v))
    }, color);
  }
}
