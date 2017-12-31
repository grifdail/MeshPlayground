noiseSeed(random())

//First we set the color;
const palette = randomPalette();
print(palette.paletteName);
setBackgroundColor(palette[0]);


const genericSphere = (x,y,z, radius, center) => Vector3.sqrDistance(new Vector3(x,y,z), center)<(radius*radius);
//The volume is defined by a function that return if the given point in the range [0,1] is inside the volume;
const volumeFunction = (...params) =>{
    if(params.some(x => x<0 || x>1)) {
        return false
    }
    return genericSphere(...params, 0.4+perlin3(params[0]*1,params[1]*5+10,params[2]*3)*0.1,  Vector3.all(0.5));
};
//The color function take a point in [0,1] and return the color at that point
const colorFunction = (x,y,z) => lerpArray(palette, remapZeroOne(perlin3(x*2,y,z*3)), Color.lerpRGB);


//The ConvexVolume primite convert the volume to a mesh.
//The mesh doesn't have to be convex but it can't have hole.
//That function can be pretty slow. Especialy with large subdivision count and small smoothness
//It work by "shrinking and wrapping" a subdivied cube around a volume;
const conv = new ConvexVolume(25, (x,y,z) => volumeFunction(1-x,y,z), colorFunction, 0.00001);
addMesh(conv, new Vector3(25,0,0), Quaternion.identity(), Vector3.all(2));

//The VoxelizedVolume primite render a volume as a somewhat blocky mesh
//A large resolution will  make the mesh appear smoother but it will be slower
//It work by evaluation every cube.
const vox = new VoxelizedVolume(50,volumeFunction, colorFunction);
addMesh(vox, new Vector3(-25,0,0));
