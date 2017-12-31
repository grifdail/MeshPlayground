import {Mesh} from "./Mesh.js";
import {MathExtensions} from "./MathExtensions.js";
import * as Primitives from "./Primitives/index.js";
import {Vector3} from "./Utils/Vector3.js";
import {Color} from "./Utils/Color.js";
import {Quaternion} from "./Utils/Quaternion.js";
import * as ColorPalettes from "./Utils/ColorPalettes.js";
import * as Pico8Colors from "./Utils/Pico8Colors.js";
import * as Utils from "./Utils/Utils.js";
import {Debug} from "./Debug.js";
import {ParamError} from "./Error.js";

export class GeneratorContext extends Mesh {
  constructor() {
    super();
    this._texture = null;
    this._backgroundColor = 0x888888;
    this._isFlat = true;
  }


  /** make the rendered mesh appear smooth;
  @tag mesh
  */
  setSmooth(v = true) {
    this._isFlat = !v;
  }

  /** Set the texture of the mesh. Can be an Image or a Canvas;
  @tag image
  */
  setTexture(texture) {
    if (texture) {
      this._texture = texture;
    }
  }
  /** Set the background color of the sketch;
  @tag color
  */
  setBackgroundColor(backgroundColor) {
    if (backgroundColor) {
      this._backgroundColor = Color.isColor(backgroundColor) ? backgroundColor.toString() : backgroundColor;
    } else {
      throw new ParamError("setBackgroundColor", ["color"], [backgroundColor]);
    }
  }

  _generateMesh() {
    if (this._isFlat) {
      return this._generateMeshFlat();
    } else {
      return this._generateMeshIndexed();
    }
  }
}
Object.assign(GeneratorContext.prototype, MathExtensions, Utils, Primitives, {
  Vector3, Color, Quaternion,
  Debug,Mesh,
  ColorPalettes, Pico8Colors
});
