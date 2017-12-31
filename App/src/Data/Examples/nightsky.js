const getHeight = (u,v) => remapZeroOne(perlin2(u,v))*50;
const uvToV2 = v1 => new Vector3(v1.x,0,v1.y);
const mapWidth = 500;
randomSeed(16);
noiseSeed(15);
setBackgroundColor(Pico8Colors.darkBlue.toString())
addFloor();
for(let i = 0; i<10; i++) {
    addTree(uvToV2(randomPointInsideCircle()));
}
for(let i = 0; i<100; i++) {
  addStar();
}

function addFloor() {
  push();
  translate(-mapWidth*0.5,0,-mapWidth*0.5);
  addFaces(new ParametricMesh(15,15,(u,v) => new Vector3(u*mapWidth,getHeight(remapMinusOneOne(u),remapMinusOneOne(v)),v*mapWidth), Pico8Colors.darkGreen));
  pop();
}

function addTree(pos) {
    push();

    const trunk = new Box(5,Pico8Colors.brown, 1, 3, 1);
    const origin = getPosForUv(pos).add(new Vector3(0,5,0));

    translate(origin);
    addFaces(trunk);

    let height = 6;
    for(let i = 0; i<3;i++) {
        translate(new Vector3(0,height,0));
        rotate(0,random()*TAU,0)
        height+=1;
        addFaces(addPyramid(6,15,15-i*3, Pico8Colors.darkGreen))
    }
    pop();
}

function addPyramid(sides, height = 1, radius = 1, color=0xffffff) {
    const m = new Mesh();
    m.setColor(color);
    for(let i =0; i< sides; i++) {
        const ti = i/sides*TAU;
        const tin = (1+i)/sides*TAU;
        const p1 = new Vector3(cos(ti) * radius, 0, sin(ti)*radius);
        const p2 = new Vector3(cos(tin) * radius, 0, sin(tin)*radius);
        m.addFace(Vector3.zero(), p1, p2);
        m.addFace(Vector3.up().scale(height),p2,p1)
    }
    return m;
}

function getPosForUv(pos) {
    const height = getHeight(pos.x,pos.z);
    pos = pos.scale(mapWidth*0.5);
    pos.y=height;
    return pos;
}

function addStar() {
  push();
  translate(randomPointOnSphere().scale(mapWidth*0.7))
  addFaces(new ParametricSphere(4,3,randomRange(1,3)))
  pop();
}
