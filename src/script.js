import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
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
systemParameters.distance = 215 * 2;
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
  100000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

scene.add(camera);

const controlParams = {};
controlParams.orbit = true;

// Controls
let controls = new OrbitControls(camera, canvas);
// controls.enablePan = true;
// controls.screenSpacePanning = true;

const toggleControl = () => {
  if (controlParams.orbit === true) {
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
  } else {
    controls = new FlyControls(camera, canvas);
    controls.movementSpeed = 0.5;
    controls.rollSpeed = 0.025;
    controls.autoForward = false;
    controls.dragToLook = true;
  }
};

gui.add(controlParams, "orbit").name("Orbit Control").onChange(toggleControl);

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

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
