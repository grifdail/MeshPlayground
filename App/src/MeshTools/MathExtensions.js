import {Vector3} from "./Utils/Vector3.js";
import {Noise} from "noisejs";
var mMath = Object.getOwnPropertyNames(Math).reduce((old, name) => {old[name] = Math[name]; return old}, {});

/**
  @tag Math
*/
export const ExtentionMethodes = {
  // Equals to 2*PI, about 6.28318530
  TAU: Math.PI * 2,
  //Convertion from degree to radian
  Deg2Rad: Math.PI / 180,
  //Convertion from radian to degree
  Rad2Deg: 180 / Math.PI,

  //Linearly interpolates between a and b by value.
  lerp(a,b,v) {
    return (b-a)*v+a;
  },
  //lerp between element of an array using the lerp function provided
  lerpArray(array, value, lerpFunction = MathExtensions.lerp) {
    const vScaled = value * (array.length-1);
    const min = Math.floor(vScaled);
    const max = min+1;
    const dv = vScaled%1;
    return lerpFunction(array[min], array[max], dv);
  },
  //Calculates the linear parameter t that produces the interpolant value within the range [a, b].
  inverseLerp (value, a, b) {
    return (value-a)/(b-a);
  },
  //Transform value from the range `a to b` to the range `c to d`
  map(value, a, b, c, d) {
    return MathExtensions.lerp(c,d,MathExtensions.inverseLerp(value, a, b));
  },
  //Clamps a value between a minimum float and maximum float value.
  clamp(min, max, value) {
    return Math.min(Math.max(min,value),max);
  },
  //Clamp a value between 0 and 1
  clamp01(value) {
    return MathExtensions.clamp(0,1,value)
  },
  //PingPongs the value, so that it is never larger than max and never smaller than min.
  pingPong(min, max, value) {
    var range = max - min;
    var multiple = value / range;
    var ascending = (multiple % 2) === 0;
    var modulus = value % range;
    return ascending ? modulus + min : max - modulus;
  },
  //Return the true modulo of a modulo b (with correct negative number)
  mod( a,  n){
      return a<0 ? (a%n + n)%n : a%n;
  },
  //Convert a number in the range [-1,1] to the range [0,1];
  remapZeroOne(a) {
    return a*0.5+0.5;
  },
  //Convert a number in the range [0,1] to the range [-1,1];
  remapMinusOneOne(a) {
    return a*2-1;
  },
  //convert a real number in the range [0,1] to one of stepCount possible value
  step(value, stepCount) {
    return Math.floor(value*stepCount)/stepCount;
  },
  /**
    @tag image
  */
  tile(width, height, value, posY = 0) {
    const x = (value%width)/width;
    const y = 1-(posY + Math.floor(value/height))/height;
    return [new Vector3(x,y), new Vector3(x+1/width,y), new Vector3(x+1/width, y-1/height), new Vector3(x, y-1/height)];
  },


  //Below are math methodes that are gonna be overwriten
  //Used for documentation purpose
  //Returns the absolute value of a number.
  abs(x) {},
  //Returns the arccosine of a number.
  acos(a) {},
  //Returns the hyperbolic arccosine of a number
  acosh(a) {},
  //Returns the arcsine of a number
  asin(a) {},
  //Returns the hyperbolic arcsine of a number
  asinh(a) {},
  //Returns the arctangent of a number.
  atan(a) {},
  //Returns the hyperbolic arctangent of a number.
  atanh(a) {},
  //Returns the arctangent of the quotient of its arguments.
  atan2(y,x) {},
  //Returns the smallest integer greater than or equal to a number.
  ceil(a) {},
  //Returns the cube root of a number.
  cbrt(b) {},
  //Returns subtracting 1 from exp(x).
  expm1(x) {},
  //Returns the number of leading zeroes of a 32-bit integer.
  clz32(x) {},
  //Returns the cosine of a number.
  cos(a) {},
  //Returns the hyperbolic cosine of a number.
  cosh(a) {},
  //Returns E^x, where x is the argument, and E is Euler's constant (2.718…), the base of the natural logarithm
  exp(x) {},
  //Returns the largest integer less than or equal to a number.
  floor(x) {},
  //Returns the nearest single precision float representation of a number.
  fround(x) {},
  //Returns the square root of the sum of squares of its arguments.
  hypot(x,y,z) {},
  //Returns the natural logarithm (loge, also ln) of a number.
  log(x) {},
  //Returns the natural logarithm (loge, also ln) of 1 + x for a number x.
  log1p(x) {},
  //Returns the base 2 logarithm of a number.
  log2(x) {},
  //Returns the base 10 logarithm of a number.
  log10(x) {},
  //Returns the largest of two or more numbers.
  max(a,b) {},
  //Returns the smallest of two or more numbers.
  min(a,b) {},
  //Returns base to the exponent power, that is, base^power
  pow(a,b) {},
  //Returns the value of a number rounded to the nearest integer.
  round(x) {},
  //Returns the sign of the x, indicating whether x is positive, negative or zero.
  sign(x) {},
  // Returns the sine of a number.
  sin(x) {},
  //Returns the hyperbolic sine of a number.
  sinh(x) {},
  // Returns the positive square root of a number.
  sqrt(x) {},
  //Returns the tangent of a number.
  tan(x) {},
  //Returns the hyperbolic tangent of a number.
  tanh(x) {},
  //Returns the integral part of the number x, removing any fractional digits.
  trunc(x) {},
  //Euler's constant and the base of natural logarithms, approximately 2.718.
  E:0,
  //Natural logarithm of 10, approximately 2.303.
  LN10:0,
  //Natural logarithm of 2, approximately 0.693.
  LN2:0,
  //Base 10 logarithm of E, approximately 0.434.
  LOG10E:0,
  //Base 2 logarithm of E, approximately 1.443.
  LOG2E:0,
  //Ratio of the circumference of a circle to its diameter, approximately 3.14159.
  PI:0,
  //Square root of 1/2; equivalently, 1 over the square root of 2, approximately 0.707.
  SQRT1_2:0,
  //Square root of 2, approximately 1.414.
  SQRT2:0

}

/**
  @tag Random
*/
export const RandomExtensionMethodes = {
  //Set the seed of the random number generator
  randomSeed(x) {},
  //Returns a pseudo-random number between 0 and 1.
  random() {},

  //Return true or false randomly
  randomBool() {
    return MathExtensions.random() < 0.5;
  },
  //Return a int between min and max
  randomInt(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(MathExtensions.randomRange(min,max))
  },
  //Return a value between min and max;
  randomRange(min,max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return MathExtensions.random()*(max-min)+min;
  },
  //Return a random point on a sphere surface;
  randomPointOnSphere() {
    const alpha = MathExtensions.random()*Math.PI*2;
    const beta = MathExtensions.acos(1 - 2 * MathExtensions.random())//*PI-PI*0.5;
    const pos = new Vector3(MathExtensions.cos(alpha) * MathExtensions.sin(beta), MathExtensions.cos(beta), MathExtensions.sin(alpha) * MathExtensions.sin(beta));
    return pos;
  },
  //Return a random point on a sphere surface;
  randomPointInsideSphere() {
    const alpha = MathExtensions.random()*Math.PI*2;
    const beta = MathExtensions.acos(1 - 2 * MathExtensions.random())//*PI-PI*0.5;
    const radius = Math.cbrt(MathExtensions.random());
    const pos = new Vector3(MathExtensions.cos(alpha) * MathExtensions.sin(beta), MathExtensions.cos(beta), MathExtensions.sin(alpha) * MathExtensions.sin(beta)).scale(radius);
    return pos;
  },
  //Return a random point on a circle perimeter
  randomPointOnCircle() {
    const alpha = MathExtensions.random()*Math.PI*2;
    const pos = new Vector3(MathExtensions.cos(alpha), MathExtensions.sin(alpha), 0);
    return pos;
  },
  //Return a random point on a Circle;
  randomPointInsideCircle() {
    const alpha = MathExtensions.random()*Math.PI*2;
    const radius = Math.sqrt(MathExtensions.random());
    const pos = new Vector3(MathExtensions.cos(alpha), MathExtensions.sin(alpha), 0).scale(radius);
    return pos;
  },

  simplex2(x,y) {},
  simplex3(x, y, z) {},
  perlin2(x, y) {},
  perlin3(x, y, z) {},
  noiseSeed(val) {}
}
var noiseGenerator = new Noise(Math.random());

var noiseFunctions = {
  simplex2: (x,y) => noiseGenerator.simplex2(x,y),
  simplex3: (x, y, z) => noiseGenerator.simplex3(x, y, z),
  perlin2: (x, y) => noiseGenerator.perlin2(x, y),
  perlin3: (x, y, z) => noiseGenerator.perlin3(x, y, z),
  noiseSeed: (val) => noiseGenerator.seed(val)
};

const randomSeededFunction = (()=> {
  var _seed = Math.random()*2147483647;
  return {
    randomSeed(seed = Math.floor(Math.random()*2147483647)) {
      _seed = seed % 2147483647;
      if (_seed <= 0) _seed += 2147483646;
    },
    random() {
      _seed = _seed * 16807 % 2147483647;
      return (_seed - 1) / 2147483646;
    }
  }
})()
export const MathExtensions =  Object.assign({}, ExtentionMethodes, RandomExtensionMethodes, noiseFunctions, mMath, randomSeededFunction);
