import {Mesh} from "../Mesh.js";
import * as THREE from "three";
 import {MathExtensions} from "../MathExtensions.js";

import {Vector3} from "../Utils/Vector3.js";
const {lerp, cos, sin, TAU} = MathExtensions;

/** A complex prism primitive
  @tag mesh
  @tag primitive
*/

export class ComplexPrismMesh extends Mesh {
    constructor(
        resolution, 
        color,
        internalRadiusBottom, 
        externalRadiusBottom, 
        internalRadiusTop, 
        externalRadiusTop, 
        centerOffsetBottom, 
        centerOffsetTop, 
        addInside = true,
        addOutside = true,
        addTop = true,
        addBottom = true,
        addExtremes = true,
        useFullFace = true,
        startAngle = 0,
        endAngle = TAU) {
        super();
        this.setColor(color);
        for(var i=0; i<resolution; i++) {
            var tC = i/(resolution);
            var tN = (i+1)/resolution
            var pointsC = this.getPoints(tC, internalRadiusBottom, externalRadiusBottom, 
                internalRadiusTop, externalRadiusTop, centerOffsetBottom, centerOffsetTop, startAngle, endAngle);
            var pointsN = this.getPoints(tN, internalRadiusBottom, externalRadiusBottom, 
                internalRadiusTop, externalRadiusTop, centerOffsetBottom, centerOffsetTop, startAngle, endAngle);
            if(addInside) {
                this.addQuad(pointsC.bi,  pointsN.bi, pointsN.ti, pointsC.ti);
            }
            if(addOutside) {
                this.addQuad(pointsC.be, pointsC.te, pointsN.te,  pointsN.be);
            }
            if(addTop) {
                if (useFullFace) {
                    this.addQuad(pointsC.te, pointsC.ti, pointsN.ti,  pointsN.te);
                } else {
                    this.addFace(pointsC.te, pointsC.ti, pointsN.te);
                }
                
            }
            if(addBottom) {
                if (useFullFace) {
                    this.addQuad(pointsC.be, pointsN.be, pointsN.bi, pointsC.bi);
                } else {
                   this.addFace(pointsC.be, pointsN.be, pointsN.bi);
                }
            }
        }
        if (addExtremes) {
            var startPoints = this.getPoints(0, internalRadiusBottom, externalRadiusBottom, 
                internalRadiusTop, externalRadiusTop, centerOffsetBottom, centerOffsetTop, startAngle, endAngle);
                this.addQuad(startPoints.bi, startPoints.ti, startPoints.te, startPoints.be)
            var endPoint = this.getPoints(1, internalRadiusBottom, externalRadiusBottom, 
                internalRadiusTop, externalRadiusTop, centerOffsetBottom, centerOffsetTop, startAngle, endAngle);
                this.addQuad(endPoint.bi, endPoint.be, endPoint.te, endPoint.ti)
        }
        
        
    }
    
    getPoints(t, 
        internalRadiusBottom, 
        externalRadiusBottom, 
        internalRadiusTop, 
        externalRadiusTop, 
        centerOffsetBottom,
        centerOffsetTop, 
        startAngle = 0,
        endAngle = TAU 
        ) {
        var alpha = lerp(startAngle, endAngle, t);
            
            
        var c = cos(alpha);
        var s = sin(alpha);
            
        var offsetBottomInside  = new Vector3(c * internalRadiusBottom, 0, s * internalRadiusBottom);
        var offsetBottomExterne = new Vector3(c * externalRadiusBottom, 0, s * externalRadiusBottom);
        var offsetTopInside     = new Vector3(c * internalRadiusTop,    0, s * internalRadiusTop);
        var offsetTopExterne    = new Vector3(c * externalRadiusTop,    0, s * externalRadiusTop);
        
        
        return {
            bi: centerOffsetBottom.add(offsetBottomInside),
            be: centerOffsetBottom.add(offsetBottomExterne),
            ti: centerOffsetTop.add(offsetTopInside),
            te: centerOffsetTop.add(offsetTopExterne),
        }
        
    }

    static disk(resolution, color, radius, doubleSided=false, startAngle = 0, endAngle = TAU) {
        return new ComplexPrismMesh(resolution, 
        color,
        0, 
        radius, 
        0, 
        radius, 
        Vector3.zero() , 
        Vector3.zero() , 
        false,
        false,
        true,
        doubleSided,
        false,
        false,
        startAngle,
        endAngle)
    }

    static diskWithHole(resolution, color, radius, holeRadius, doubleSided=false, startAngle = 0, endAngle = TAU) {
        return new ComplexPrismMesh(resolution, 
        color,
        holeRadius, 
        radius, 
        holeRadius, 
        radius, 
        Vector3.zero() , 
        Vector3.zero() , 
        false,
        false,
        true,
        doubleSided,
        false,
        true,
        startAngle,
        endAngle)
    }
    
};