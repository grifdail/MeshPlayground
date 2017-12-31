// Mesh Playground support basic texturing
// the tile function can be used to simplify uv creation when dealing with tilemap;
// We need to redefine the cube UV as the default use the whole image.

// tile take an the number of column and row in a tile map, along with the tile
// coordinate and return the uv data info as an array
// [top left corner, top right corner, bottom right corner, bottom left corner]

//We create a sampler so we dont have to input column and row every time
const tileSampler = (x,y) => tile(2,2,x,y);

var box = new Box(15);

box.calculateFaceWithTile = function() {
    this.clearFaces();
    // We can use es6 opperator to go faster
    this.addQuad(this.LTB, this.RTB, this.RBB, this.LBB, ...tileSampler(0,0)); // you can pass the tile coordinate on the grid
    this.addQuad(this.LTF, this.LTB, this.LBB, this.LBF, ...tileSampler(0,0));
    this.addQuad(this.LTF, this.RTF, this.RTB, this.LTB, ...tileSampler(1,0));
    this.addQuad(this.RTB, this.RTF, this.RBF, this.RBB, ...tileSampler(0,0));
    this.addQuad(this.RTF, this.LTF, this.LBF, this.RBF, ...tileSampler(0,0));
    this.addQuad(this.LBB, this.RBB, this.RBF, this.LBF, ...tileSampler(3)); // You can also give the tile id
}

box.calculateFaceWithTile();
addFaces(box);

return loadImage("examples_ressources/tiles.png").then(img => {
   setTexture(img);
});
