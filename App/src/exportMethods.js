import {download} from "./utils.js"

export function exportToPly(geometry, name = "model") {
  console.log(geometry, geometry.getAttribute);
  var positions = geometry.getAttribute("position").array;
  var colors = geometry.getAttribute("color").array;
  var vertexCount = positions.length / 3;
  var faceCount = vertexCount / 3;
  var header  = "";
  header+="ply\n";
  header+="format ascii 1.0\n";
  header+="element vertex " + vertexCount + "\n";
  header+="property float x\n";
  header+="property float y\n";
  header+="property float z\n";
  header+="property uchar red\n";
  header+="property uchar green\n";
  header+="property uchar blue\n";
  header+="element face "+ faceCount +"\n";
  header+="property list uchar int vertex_index \n";
  header+="end_header\n";
  var vertexStr = "";
  var faceStr = "";
  var tc = n => Math.floor(255* n);
  var tn = toNumberString;
  for (var i = 0; i < positions.length; i+=3) {
    vertexStr+= [tn(positions[i + 0]), tn(positions[i + 1]), tn(positions[i + 2]), tc(colors[i + 0]), tc(colors[i + 1]), tc(colors[i + 2])].join(" ")+"\n";;
    if((i%9)===0) {
      faceStr+="3 "+[i/3, i/3+1, i/3+2].join(" ")+"\n";
    }
  }
  var result = header+vertexStr+faceStr;
  console.log(result.length);
  download(name+".ply", result);
}

export function exportToObj(geometry, name = "model") {
  const positions = geometry.getAttribute("position").array;

  var vertexStr = "";
  var faceStr = "";
  var vertexIndex = 0;
  for (var i = 0; i < positions.length; i+=9) {
    faceStr+="f "+[vertexIndex+1, vertexIndex+2, vertexIndex+3].join(" ")+"\n";
    vertexStr+= "v " +[positions[i + 0], positions[i + 1], positions[i + 2]].map(toNumberString).join(" ")+"\n";;
    vertexStr+= "v " +[positions[i + 3], positions[i + 4], positions[i + 5]].map(toNumberString).join(" ")+"\n";;
    vertexStr+= "v " +[positions[i + 6], positions[i + 7], positions[i + 8]].map(toNumberString).join(" ")+"\n";;
    vertexIndex+=3;

  }
  var result = vertexStr+faceStr;
//console.log(result);
  download(name+".obj", result);
}

function toNumberString(num) {
  console.log(num);
  if (Number.isInteger(num)) {
    return num + ".0"
  } else {
    if (Math.abs(num)<0.001) {
      console.log ("0.0");

      return "0.0"
    } else {
      return num.toString();
    }
    
  }
}
