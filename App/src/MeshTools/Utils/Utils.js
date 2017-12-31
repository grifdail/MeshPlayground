import {MathExtensions} from "../MathExtensions.js";
import {Vector3} from "./Vector3.js";
import {Color} from "./Color.js";
import * as ColorPalettes from "./ColorPalettes.js";
import {Error} from "../Error.js";

//export function sphereVolume(radius, center) {return (x,y,z) => (x-center.x)*(x-center.x)+(y-center.y)*(y-center.y)+(z-center.z)*(z-center.z)<radius*radius; }

/** Return one of the Palette of ColorPalettes;
@tag color
@tag random
*/
export function randomPalette() {
  const paletteKeys = Object.keys(ColorPalettes);
  const keys = paletteKeys[MathExtensions.randomInt(paletteKeys.length)]
  const palette = ColorPalettes[keys];
  palette.paletteName = keys;
  return palette;
}

/** Create a subdivided quad
  @param {mesh} mesh the mesh to which the item will be added
  @param {vector} tl the first corner position
  @param {vector} tr the second corner position
  @param {vector} bl the third corner position
  @param {vector} bt the last corner position
  @param {number} subDiv the number of subdivision
  @tag mesh

*/
export function subdividedQuad(mesh, tl, tr, bl, bt, subDiv) {
  for(let u = 0; u<subDiv; u++) {
    for(let v = 0; v<subDiv; v++) {
      var a = Vector3.UVLerp(tl, tr, bl, bt, (u+0)/subDiv, (v+0)/subDiv);
      var b = Vector3.UVLerp(tl, tr, bl, bt, (u+1)/subDiv, (v+0)/subDiv);
      var c = Vector3.UVLerp(tl, tr, bl, bt, (u+1)/subDiv, (v+1)/subDiv);
      var d = Vector3.UVLerp(tl, tr, bl, bt, (u+0)/subDiv, (v+1)/subDiv);
      if((v+u)%2) {
        mesh.addFace(a,c,b);
        mesh.addFace(a,d,c);
      } else {
        mesh.addFace(b,d,c);
        mesh.addFace(b,a,d);
      }
    }
  }
}

/**
  return a promise that resolve with the image object loaded from url
  This is asynchrone so your sketch need to return a promise to be able to use this image data
  @param {string} url the url to the image. The URL need to allow cross domain request
  @tag async
  @tag image
*/
export function loadImage(url) {
  const errorToThrow = Error(`image at "${url}" could not be loaded.`,1)
  return new Promise((s,r) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.addEventListener("load", () => s(img));
    img.addEventListener("error", (...params) => {
      r(errorToThrow);
    });
    img.src= url;
  })
}

/**
  Create a canvas that you can use as a texture or a a sampler
  @return {object} {canvas, ctx} canvas is the canvas element, ctx is a CanvasRenderingContext2D
  @tag image
*/
export function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return {canvas: canvas, ctx: canvas.getContext("2d")};
}

/**
  return a promise that resolve with a sampler function that take u and v parameter (in [0, 1]) and return the color of the pixel a that point
  This is asynchrone so your sketch need to return a promise to be able to use this image data
  @param targer can be an Image, a Canvas or the url URL to an image
  @tag async
  @tag image
*/
export function loadSampler(target) {
  var p = null;
  if (typeof target === "string") {
    const errorToThrow = Error(``,1)
    p = loadImage(target)
      .catch(err => {
          errorToThrow.message = err.message;
          throw errorToThrow;
      });

  } else {
    p = new Promise.resolve(target);
  }
  return p.then(img => {
    const {ctx} = createCanvas(img.width, img.height);
    ctx.drawImage(img,0,0)
    return ctx.getImageData(0, 0, img.width, img.height);

  }).then(image => {
    const sampler = (u,v) => {
      var floatX = u*image.width;
      var floatY = v*image.height;
      var intX = Math.floor(floatX);
      var intY = Math.floor(floatY);
      var i = (intX + intY * image.width)*4
      return new Color(image.data[i+0]/255, image.data[i+2]/255, image.data[i+3]/255, image.data[i+4]/255);
    }
    return sampler;
  })
}
