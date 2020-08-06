import {Mesh} from "../Mesh.js";
import {Box} from "./Box.js";
import {Color} from "../Utils/Color.js";
import {Vector3} from "../Utils/Vector3.js";
import {Error, ParamError} from "../Error.js";

const defaultColor = () => new Color(1,1,1);
/**
Represent a volume as a Voxel Mesh
@tag primitive
  @tag mesh
@tag voxel
@tag volume
*/
export class VoxelizedVolume extends Mesh {
  /**
  Create a new VoxelizedVolume
  @param {number} size the resolution of the voxel object... Bigger size take more time to compute.
  @param {function} fn define the volume. Take x,y and z parameters in [0,1] and return true if the point is inside the volume;
  @param {function} fn define the color of the volume. Take x,y and z parameters in [0,1] and return the color at that point;
  */
  constructor(size, fn, colorFn = defaultColor) {
    if (!fn || typeof fn !== "function" || !size>0 || typeof colorFn !== "function") { //!size>0 to also check for NaN and undefined values
      throw new ParamError("new VoxelizedVolume()", ["number", "function", "function"], [size, fn, colorFn]);
    }
    super();
    const m = this;
    const box = new Box(1); //Only used for the geometry data
    const delta = 1/size;
    m.translate(-size*0.5,-size*0.5,-size*0.5);
    for(var x = 0; x<size; x++) {
      for(var y = 0; y<size; y++) {
        for(var z = 0; z<size; z++) {
          m.push();
          m.translate(new Vector3(x,y,z));

          let posCenter = new Vector3((x+0.5)/size, (y+0.5)/size, (z+0.5)/size);
          const color = colorFn(posCenter.x,posCenter.y,posCenter.z);
          if(!Color.isColor(color)) {
            throw new Error("The color function should return a color");
          }
          m.setColor(color)
          if (fn(posCenter.x,posCenter.y,posCenter.z)) {
            if (!fn(posCenter.x-delta,posCenter.y,posCenter.z)) {
              m.addQuad(box.LTF, box.LTB, box.LBB, box.LBF);
            }
            if (!fn(posCenter.x+delta,posCenter.y,posCenter.z)) {
              m.addQuad(box.RTB, box.RTF, box.RBF, box.RBB);
            }
            if (!fn(posCenter.x,posCenter.y+delta,posCenter.z)) {
              m.addQuad(box.LTF, box.RTF, box.RTB, box.LTB);
            }
            if (!fn(posCenter.x,posCenter.y-delta,posCenter.z)) {
              m.addQuad(box.LBB, box.RBB, box.RBF, box.LBF);
            }
            if (!fn(posCenter.x,posCenter.y,posCenter.z+delta)) {
              m.addQuad(box.RTF, box.LTF, box.LBF, box.RBF);
            }
            if (!fn(posCenter.x,posCenter.y,posCenter.z-delta)) {
              m.addQuad(box.LTB, box.RTB, box.RBB, box.LBB);
            }
          };
          m.pop()
        }
      }
    }
  }
}
