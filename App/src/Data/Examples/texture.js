
// Mesh Playground support basic texturing
// Box have a default UV mapping

var box = new Box(15);
addFaces(box);

return loadImage("examples_ressources/tile.png").then(img => {
   setTexture(img);
});
