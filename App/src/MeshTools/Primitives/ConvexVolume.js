import {Mesh} from "../Mesh.js";
import {Box} from "./Box.js";
import {Color} from "../Utils/Color.js";
import {Vector3} from "../Utils/Vector3.js";
import {Error, ParamError} from "../Error.js";
import {subdividedQuad} from "../Utils/Utils.js";

const defaultColor = () => new Color(1,1,1);
/**
Represent a volume as a Mesh
@tag mesh
@tag primitive
@tag volume
*/
export class ConvexVolume extends Mesh {
  /**
  Create a new ConvexVolume
  @param {number} subdiv the resolution of the mesh... Bigger size take more time to compute.
  @param {function} fn define the volume. Take x,y and z parameters in [0,1] and return true if the point is inside the volume;
  @param {function} fn define the color of the volume. Take x,y and z parameters in [0,1] and return the color at that point;
  @param {number} smoothness represent how smooth a volume is... Smaller is better but reduce performance Should be at least under 0.5. ;
  */
  constructor(subdiv, fn, colorFunction = defaultColor, smoothness = 0.001) {
    if (!fn || typeof fn !== "function" || !subdiv || typeof colorFunction !== "function") { //!size>0 to also check for NaN and undefined values
      throw new ParamError("new ConvexVolume()", ["number", "function", "function", "number"], [subdiv, fn, colorFunction, smoothness]);
    }
    super();
    const divide = (v1,v2) => {
      const midPoint = Vector3.lerp(v1,v2,0.5)
      if (Vector3.sqrDistance(v1,v2)<(1/subdiv*smoothness)) {
        return midPoint;
      }
      return fn(midPoint.x, midPoint.y, midPoint.z) ? divide(v1,midPoint) : divide(midPoint, v2);

    }
    const halfBlock = Vector3.all(subdiv/2)
    const center = Vector3.all(0.5);
    const mesh = this;
    var box = new Box(subdiv)
    subdividedQuad(mesh, box.LTF, box.RTF, box.RBF, box.LBF, subdiv);
    subdividedQuad(mesh, box.LTB, box.RTB, box.RTF, box.LTF, subdiv);
    subdividedQuad(mesh, box.RTF, box.RTB, box.RBB, box.RBF, subdiv);
    subdividedQuad(mesh, box.LTB, box.LTF, box.LBF, box.LBB, subdiv);
    subdividedQuad(mesh, box.LBF, box.RBF, box.RBB, box.LBB, subdiv);
    subdividedQuad(mesh, box.RTB, box.LTB, box.LBB, box.RBB, subdiv);
    mesh.mapVertices(v1=>{
      return divide(v1.add(halfBlock).scale(1/subdiv),center).scale(subdiv).subtract(halfBlock)

    }, true);
    mesh.mapFaces((face)=> {
      const centerPoint = new Vector3(
        face.v1.x + face.v2.x + face.v3.x,
        face.v1.y + face.v2.y + face.v3.y ,
        face.v1.z + face.v2.z + face.v3.z ).scale(1/subdiv/3).add(Vector3.all(0.5))
        const color = colorFunction(centerPoint.x,centerPoint.y,centerPoint.z);
        if(!Color.isColor(color)) {
          throw new Error("The color function should return a color");
        }
        face.color = color;
        return face;
      })
      return mesh;
    }
  }
