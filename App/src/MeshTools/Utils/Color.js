import cssColor from "../../Data/ColorByName.json"

/** Represent a color
  @property {number} r the red components of the color in the range [0,1];
  @property {number} g the green components of the color in the range [0,1];
  @property {number} b the blue components of the color in the range [0,1];
  @property {number} h the hue of the color in the range [0,360];
  @property {number} s the saturation of the color in the range [0,1] (0 means grey, 1 means colorfull);
  @property {number} l the lightness of the color in the range [0,1] (0 means black, 1 means white);
  @tag color
*/
export class Color {
  constructor(...params) {
    const [r,g,b,a] = parseColor(...params);
    this._r = r;
    this._g = g;
    this._b = b;
    this.a = a;
    this.updateHSL();
  }

  /** @hidden */
  get r() { return this._r; }
  /** @hidden */
  get g() { return this._g; }
  /** @hidden */
  get b() { return this._b; }
  /** @hidden */
  get h() { return this._h; }
  /** @hidden */
  get s() { return this._s; }
  /** @hidden */
  get l() { return this._l; }

  /** @hidden */
  set r(a) { this._r = a; this.updateHSL() }
  /** @hidden */
  set g(a) { this._g = a; this.updateHSL() }
  /** @hidden */
  set b(a) { this._b = a; this.updateHSL() }
  /** @hidden */
  set h(a) { this._h = a%360; this.updateRGB() }
  /** @hidden */
  set s(a) { this._s = a; this.updateRGB() }
  /** @hidden */
  set l(a) { this._l = a; this.updateRGB() }

  /** @hidden */
  updateHSL() {
    const [h,s,l] = rgbToHsl(this._r, this._g, this._b);
    this._h = h * 360;
    this._s = s;
    this._l = l;
  }
  /** @hidden */
  updateRGB() {
    const [r,g,b] = hslToRgb((this._h%360)/360, this._s, this._l);
    this._r = r;
    this._g = g;
    this._b = b;
  }
  //Return the color as an int;
  toInt() {
    return ((this.r * 255)<<16)|((this.g * 255)<<8)|((this.b * 255));
  }

  toString() {
    const m = x => Math.floor(x*255);
    return `rgba(${m(this.r)}, ${m(this.g)}, ${m(this.b)}, ${this.a})`
  }

  static fromHSL(h,s,l,a) {
    return new Color(...hslToRgb((h%360)/360,s,l),a)
  }

  static lerpRGB(c1,c2,v) {
    const lerp = (a,b) => a+(b-a)*v;
    return new Color(
      lerp(c1.r,c2.r),
      lerp(c1.g,c2.g),
      lerp(c1.b,c2.b),
      lerp(c1.a,c2.a)
    );
  }

  static lerpHSL(c1,c2,v) {
    const lerp = (a,b) => a+(b-a)*v;
    return new Color.fromHSL(
      lerp(c1.h,c2.h),
      lerp(c1.s,c2.s),
      lerp(c1.l,c2.l),
      lerp(c1.a,c2.a)
    );
  }
  static isColor(v) {
    return v instanceof Color;
  }
}

/*
  @hidden
*/
function parseColor(...params) {
  if (params.length === 1) {
    const param = params[0];
    if (typeof param === "string") {
      return parseCSS(param);
    } else if (typeof param === "number") {
      return parseIntColor(param);
    } else {
      if (Array.isArray(param)) {
        return param;
      } else {
        return [
          param.r,
          param.g,
          param.b,
          param.a === undefined ? param.a : 1
        ]
      }
    }

  } else {
    return params;
  }
}
/*
  @hidden
*/
function parseCSS(str) {
  return cssNamed(str) || cssHex3 || cssHex6 || cssRgb || cssRgba || cssHsl || cssHsla;
}
/*
  @hidden
*/
function parseIntColor(a) {
  return [
    ((a>>16) & 0xff)/255,
    ((a>>8) & 0xff)/255,
    (a & 0xff)/255,
    1-((a>>24) & 0xff)/255
  ]
}
/*
  @hidden
*/
function cssNamed(str) {
  var c = cssColor[str.toLowerCase()];
  if(!c) return;
  return [
    c[0]/255,
    c[1]/255,
    c[2]/255,
    1
  ];
}
/*
  @hidden
*/
function cssRgb(str) {
  if (0 === str.indexOf('rgb(')) {
    str = str.match(/rgb\(([^)]+)\)/)[1];
    var parts = str.split(/ *, */).map(Number);
    return [
      parts[0]/255,
      parts[1]/255,
      parts[2]/255,
      1
    ];
  }
}
/*
  @hidden
*/
function cssRgba(str) {
  if(str.indexOf('rgba(') === 0) {
    str = str.match(/rgba\(([^)]+)\)/)[1];
    var parts = str.split(/ *, */).map(Number);

    return [
      parts[0]/255,
      parts[1]/255,
      parts[2]/255,
      parts[3]
    ];
  }
}
/*
  @hidden
*/
function cssHex6(str) {
  if('#' === str[0] && 7 === str.length) {
    return [
      parseInt(str.slice(1, 3), 16)/255,
      parseInt(str.slice(3, 5), 16)/255,
      parseInt(str.slice(5, 7), 16)/255,
      1
    ];
  }
}
/*
  @hidden
*/
function cssHex3(str) {
  if('#' === str[0] && 4 === str.length) {
    return [
      parseInt(str[1] + str[1], 16)/255,
      parseInt(str[2] + str[2], 16)/255,
      parseInt(str[3] + str[3], 16)/255,
      1
    ];
  }
}

/*
  @hidden
*/
function cssHsl(str) {
  if(str.indexOf('hsl(') === 0) {
    str = str.match(/hsl\(([^)]+)\)/)[1];
    var parts = str.split(/ *, */);

    var h = parseInt(parts[0], 10);
    var s = parseInt(parts[1], 10);
    var l = parseInt(parts[2], 10);

    var rgba = hslToRgb(h/360, s/100, l/100);
    rgba.a = 1;

    return rgba;
  }
}

/*
  @hidden
*/
function cssHsla(str) {
  if(str.indexOf('hsla(') === 0) {
    str = str.match(/hsla\(([^)]+)\)/)[1];
    var parts = str.split(/ *, */);

    var h = parseInt(parts[0], 10);
    var s = parseInt(parts[1], 10);
    var l = parseInt(parts[2], 10);
    var a = parseInt(parts[3], 10);

    var rgba = hslToRgb(h/360, s/100, l/100);
    rgba.a = a;

    return rgba;
  }
}

/*
  @hidden
*/
function hslToRgb(h, s, l){
    var r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r, g, b];
}

/*
  @hidden
*/
function rgbToHsl(r, g, b){
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max === min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: h = null;
        }
        h /= 6;
    }

    return [h, s, l];
}
