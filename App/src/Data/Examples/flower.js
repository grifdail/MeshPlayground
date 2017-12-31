
function createFlower(palette) {
    const petalRatio = 0.4;
    const midPetalElevationRatio = 0.6;
    for(var j = 0; j<palette.length; j++) {
        setColor(palette[j]);
        const petalElevation = 10+pow(j,2.1)*0.5;
        const count = 10-j;
        const petalLength = 20-pow(j,1.1)*3;
        const petalWidth = 5 -j*0.7
        for(var i =0; i<=count; i+=1) {
            push();
            rotate(0,i/count*TAU,0);

            addDoubleFacedQuad(
                Vector3.zero(),
                new Vector3(-petalWidth,midPetalElevationRatio*petalElevation,petalRatio*petalLength),
                new Vector3(0,petalElevation,petalLength),
                new Vector3(petalWidth,midPetalElevationRatio*petalElevation,petalRatio*petalLength) );
            pop()
        }
    }
}


function addDoubleFacedQuad(a,b,c,d) {
    addQuad(a,b,c,d);
    addQuad(a,d,c,b);
}

translate(0,-20,0)
setBackgroundColor(ColorPalettes.Wild[1])
createFlower(ColorPalettes.Ice);
