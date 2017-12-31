
The basic unit of Mesh Playground is the vector.

The baisc unit of Mesh Playground is the triangle.

in the editor, remove everything and type
```
addTriangle(Vector3.zero(), Vector3.up(), Vector3.right());
```

congratulation you wrote your first programe. You may need to rotate the camera and to zoom to see the mesh you created.



Vector3.zero(), Vector3.up(), Vector3.right() create new vector with coordinate (0,0,0), (0,1,0) and (1,0,0) respectively. (Other shorthand are left (-1,0,0), down (0,-1,0), forward (0,0,1), back (0,0,-1), one (1,1,1) and finaly all(x) (x,x,x))
addTriangle() add a new triangle to mesh.

So your first mesh is composed of one triangle whose vertex are the point (0,0,0), (0,1,0) and (0,0,1);

Note that the triangle is only visible on one side. When you return the camera you can't see the shape. That's because the triangle also have a direction. To specify that direction, you have to pass the vertice of the triangle in a clockwise order as  if you were facing it. For instance `addTriangle(Vector3.zero(), Vector3.right(), Vector3.up());` would produce the exact same triangle facing the other way. If you combine the two you'll have a traingle visible from both side. When debuging a program, it may be very helpfull to rotate the camera if some face doesn't show up because sometime they're just facing the other way.

Quad
====

Often, you will want add two triangles sharing one edge aka a Quad. There's a shortcute to do that: addQuad.
