// If you return a Promise, the mesh generator will wait for the promise
// to resolve before calculating the mesh.
// This allow you to import data such as texture
// You can use these texture as an height map for instance

// loadSampler take an url and resolve with a sampling function
// the sampler take u and v parameters (in the range [0,1]) and return the color
// of that pixel at that point as an array [red, green, blue, alpha] (in the
// range [0,255]). No interpolation is used yet while sampling.

// Note that the picture must be served from a server allowing cross origin
// request ( see https://en.wikipedia.org/wiki/Cross-origin_resource_sharing )

// This code can be pretty due to the image loading and the huge ParametricMesh


return loadSampler("examples_ressources/heightmap.png").then(sampler=> {
    var p  = new ParametricMesh(255,255,(u,v) => {
        var color = sampler(u,v);
        var greyScale = color.l; //Remove alpha and convert to greyscale
        let height = greyScale //We normalize the calculated depth
        return new Vector3(u*100,height*10,v*100)
    })

    addFaces(p);
});
