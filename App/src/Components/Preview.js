import * as THREE from "three";
import React, { Component } from 'react';
import OrbitControls from 'three-orbitcontrols'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import {  SSAOPass  } from 'three/examples/jsm/postprocessing/SSAOPass.js';







const startTime = Date.now();

class Preview extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    this.state = {}
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45.0, window.innerWidth / window.innerHeight, 0.1, 2000.0 );

    const renderer = new THREE.WebGLRenderer( { antialias: true, precision:"highp", depth:true } );
    const geometry = this.props.geometry || new THREE.BoxBufferGeometry( 10, 10, 10 );
    const material = this.props.material || new THREE.MeshPhongMaterial( {shininess: 0.1 , vertexColors: THREE.VertexColors} );
    const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    const light2 = new THREE.AmbientLight( 0x888888, 1 );
    const mesh = new THREE.Mesh( geometry, material );
    const composer = new EffectComposer(renderer);
    var renderPass = new  RenderPass ( scene, camera );
    composer.addPass( renderPass );
    var glitchPass = new  SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
    glitchPass.kernelSize  = 10;
    glitchPass.kernelRadius = 5;
    glitchPass.minDistance = 0.001;
  glitchPass.maxDistance = 0.01;
    glitchPass.beautyRenderTarget.depthTexture.type = 1015;
    composer.addPass( glitchPass );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0x888888);
    camera.position.z = 100;
    light.position.set( 1, 1, 1 );
    light2.position.set( 1, 1, 1 );

    //scene.add(camera);

    scene.add(light);
    scene.add(light2);
    scene.add(mesh);

    const controls = new OrbitControls( camera,  renderer.domElement );
    controls.minDistance = 100.0;
    controls.maxDistance = 800.0;
    controls.autoRotate = true;
    controls.enableKeys = false;
    controls.screenSpacePanning = true;
    controls.dynamicDampingFactor = 0.1;



    this.refs.parent.appendChild( renderer.domElement );
    this.setState({mesh, renderer, camera, controls, light, scene, material, composer, glitchPass}, () => {
      this.resize();
      this.animate();
    });

    window.addEventListener( 'resize', this.resize, false );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
    window.cancelAnimationFrame(this.animate);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.camera.reset !== this.props.camera.reset) {
      const {controls} = this.state;
      controls.reset();
    }
  }
  componentDidUpdate() {
    const {mesh, controls, renderer, scene, glitchPass} = this.state;
    if (this.props.geometry && mesh.geometry !== this.props.geometry) {
      mesh.geometry = this.props.geometry;
    }
    this.createMaterial();
    controls.autoRotate = this.props.camera.autoRotate;
    const backgroundColor  = this.props.backgroundColor === undefined ? 0x888888 :  this.props.backgroundColor
    scene.fog = new THREE.FogExp2( backgroundColor, 0.0025 );
    renderer.setClearColor(backgroundColor);
    glitchPass.enabled = this.props.camera.ssao;
  }

  createMaterial() {
    const mesh = this.state.mesh;
    let texture = null;
    if (this.props.texture) {
      texture = new THREE.Texture();
      texture.image = this.props.texture;
      const src = this.props.texture.src;
      var isJPEG =  src && (src.search( /\.(jpg|jpeg)$/ ) > 0 || src.search( /^data:image\/jpeg/ ) === 0);
			texture.format = isJPEG ? THREE.RGBFormat : THREE.RGBAFormat;
      texture.needsUpdate = true;
    }
    var backgroundColor = this.props.backgroundColor === undefined ? 0x888888 :  this.props.backgroundColor;
    this.uniforms = {
      time: {value: Date.now()/1000},
      image1: {value: texture},
      backgroundColor: {value: new THREE.Color(backgroundColor)}
    };
    var material = new THREE.ShaderMaterial( {
    	uniforms: this.uniforms,
      vertexColors: true,
    	vertexShader: this.props.shader.vertex,
    	fragmentShader: this.props.shader.fragment
    } );
    mesh.material = material; //=  new THREE.MeshPhongMaterial( {color: 0xffffff, shininess: 0.1, vertexColors: THREE.VertexColors,  map: texture } );
  }

  animate( time ) {
    requestAnimationFrame( this.animate );
    let {camera, controls, renderer, scene, light, composer} = this.state;
     this.uniforms.time.value = (Date.now()-startTime)/1000;
    controls.update();
    let cameraPos = camera.position;
    light.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    composer.render(  );
  }

  resize() {
    var div = this.refs.parent;
    if(!div) {
      return;
    }
    var containerStyle = getComputedStyle(div,null);
    let height = parseInt(containerStyle.getPropertyValue('height'),10)-5;
    let width = parseInt(containerStyle.getPropertyValue('width'),10);
    let {camera, renderer, composer} = this.state;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
    composer.setSize( width, height );

  }

  render() {
    return ( <div className="preview" ref="parent"></div>)
  }


}
export default Preview;
