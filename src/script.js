import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import * as dat from "lil-gui";
import * as xmljs from "xml-js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import StarSystem from "./StarSystem";
import generateSystem from "./GenerateSystem";
/**
 * Base
 */

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * textures
 */

const textureLoader = new THREE.TextureLoader();

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(-1, 1.5, 2.5);
// gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
// gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
// gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
// gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

/**
 * Materials
 */
const material = new THREE.MeshNormalMaterial();
// material.wireframe = true;
// material.roughness = 0.7;
// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */

const systemParameters = {};
systemParameters.distance = 1;
systemParameters.speed = 0.01;
gui.add(systemParameters, "speed").min(0).max(0.1).step(0.001);

let xml = StarSystem();

var options = {
  compact: true,
  ignoreComment: true,
  alwaysChildren: true,
};
var system = xmljs.xml2js(xml, options);

console.log(system);

let planets = [];
let allPlanetsArray = [];

generateSystem(system, systemParameters, allPlanetsArray, scene, material);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

scene.add(camera);




/**
 * Controls
 */
const controlParams = {
  orbit: true,
  fly: false,
  pointerlock: false
}

const controlsFolder = gui.addFolder("Camera Controls");
controlsFolder.add(controlParams, 'orbit').name('Orbit').listen().onChange(function(){setChecked("orbit")});
controlsFolder.add(controlParams, 'fly').name('Fly').listen().onChange(function(){setChecked("fly")});
// controlsFolder.add(controlParams, 'pointerlock').name('Pointer Lock').listen().onChange(function(){setChecked("pointerlock")});

function setChecked( prop ){
  for (let param in controlParams){
    controlParams[param] = false;
  }
  controlParams[prop] = true;
  toggleControl();
}


let controls = new OrbitControls(camera, canvas);

const toggleControl = () => {
  if (controlParams.orbit === true) {
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
  }
  if(controlParams.fly === true) {
    controls = new FlyControls(camera, canvas);
    controls.movementSpeed = 0.5;
    controls.rollSpeed = 0.005;
    controls.autoForward = false;
    controls.dragToLook = true;
    controls.enableZoom = false;
  }
};


/**
 * Pointer events
 */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

// function render() {


// 	renderer.render( scene, camera );

// }
window.addEventListener( 'mousemove', onMouseMove, false );



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.shadowMap.enabled = false
// renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Trails
let composer;
let afterimagePass;

composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

afterimagePass = new AfterimagePass();
composer.addPass(afterimagePass);

const params = {
  trails: false,
};

gui.add(params, "trails");
gui.add(afterimagePass.uniforms["damp"], "value", 0.5, 1).step(0.001);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  const delta = clock.getDelta();

  allPlanetsArray.map((planet) => {
    planet.mesh.position.x =
      (Math.cos(planet.eccentricity) + planet.semimajoraxis) *
      Math.cos(elapsedTime * planet.period * systemParameters.speed);

    planet.mesh.position.y =
      (Math.sin(planet.eccentricity) + planet.semimajoraxis) *
      Math.sin(elapsedTime * planet.period * systemParameters.speed);

    // planet.mesh.position.z =
    //   Math.sin(planet.inclination) *
    //   Math.sin(elapsedTime * planet.period * systemParameters.speed);

    // planet.mesh.position.z =
    //   Math.cos(planet.inclination) *
    //   Math.cos(elapsedTime * planet.period * systemParameters.speed);
  });

  // Render
  // renderer.render(scene, camera);
  if (params.trails) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }

  // Update controls
  controls.update(elapsedTime * 0.01);



	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {
		//  intersects[ i ].object.material.color.set( 0xff0000 );
    console.log(intersects[i].object.name);
	}



  // Call tick again on the next frame
  window.requestAnimationFrame(tick);

};

tick();
