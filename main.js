import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//Constants
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
const controls = new OrbitControls( camera, renderer.domElement );
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

//Renderer
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//3D Model
loader.load( 'public/buildings/bigBuilding.gltf', function ( gltf ) {scene.add( gltf.scene );});
loader.load( 'public/buildings/smallBuilding.gltf', function ( gltf ) {scene.add( gltf.scene );});
loader.load( 'public/buildings/sky.gltf', function ( gltf ) {scene.add( gltf.scene );});


//SkyDome
var skyGeo = new THREE.SphereGeometry(100000, 25, 25); 

//Lighting
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 10 );
scene.add( light );

//Camera Position
camera.position.set( 0, 10, 0);

//Animation
function animate() {
	requestAnimationFrame( animate );
    controls.update();

	renderer.render( scene, camera );
}

animate();