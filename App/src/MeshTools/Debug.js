import * as THREE from "three";

export const Debug = {
  _helpers: [],
  clear() {
    for (var helper of this._helpers) {
      console.log(helper);
      //SceneData.scene.remove(helper);
    }
    this._helpers = [];
  },
  point(v, color) {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: color } );
    var cube = new THREE.Mesh( geometry, material );
    //eneData.scene.add( cube );
    cube.position.set(v.x,v.y,v.z);
    this._helpers.push(cube);
  }
}
