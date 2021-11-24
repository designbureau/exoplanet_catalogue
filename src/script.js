import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import * as xmljs from "xml-js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import StarSystem from "./StarSystem";

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
const material = new THREE.MeshStandardMaterial();
material.wireframe = true;
material.roughness = 0.7;
// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */

const systemParameters = {};
systemParameters.distance = 215 * 2;

let xml = StarSystem();


var options = {
  compact: true,
  ignoreComment: true,
  alwaysChildren: true,
};
var system = xmljs.xml2js(xml, options);

console.log(system);

//jupiter:earth radius = 11.209
//jupiter:earth mass = 318
//au:sol radius/mass/distance
//jupiter:sol radius = 11

let planets = [];
let allPlanetsArray = [];
const jupiterMass = 11;

const generateSystem = () => {
  /**
   * Planet Renderer
   */
  const renderPlanet = (planet, starGroup) => {
    let planetsArray = [];
    Array.isArray(planet) ? (planetsArray = planet) : planetsArray.push(planet);

    // console.log(planets);
    planetsArray.map((planet, i) => {
      let semimajoraxis, eccentricity, period, inclination, radius;

      planet.hasOwnProperty("radius")
        ? (radius = parseFloat(planet.radius._text)) : radius = 1;

      const planetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 32, 32),
        material
      );

      planet.hasOwnProperty("semimajoraxis")
        ? (semimajoraxis =
            parseFloat(planet.semimajoraxis._text) * systemParameters.distance)
        : (semimajoraxis = 0.25 * systemParameters.distance + i * 100);

      planet.hasOwnProperty("eccentricity")
        ? (eccentricity = parseFloat(planet.eccentricity._text))
        : (eccentricity = 0);

      planet.hasOwnProperty("period")
        ? (period = parseFloat(planet.period._text))
        : (period = 0.1);

      planet.hasOwnProperty("inclination")
        ? (inclination = parseFloat(planet.inclination._text))
        : (inclination = 0);

      planetMesh.position.x = semimajoraxis;

      // TODO:these need to orbit relative to group center. They should already, but don't appear to.
      allPlanetsArray.push({
        mesh: planetMesh,
        semimajoraxis,
        period,
        eccentricity,
        inclination,
      });

      if (starGroup === null) {
        scene.add(planetMesh);
      } else {
        starGroup.add(planetMesh);
      }
    });
  };

  /**
   * Star Renderer
   */
  const renderStar = (star, separation = 0, binaryGroup = null) => {
    let starsArray = [];
    Array.isArray(star) ? (starsArray = star) : starsArray.push(star);

    const starsArraySize = starsArray.length;
    starsArray.map((star, i) => {
      let starRadius;
      star.hasOwnProperty("radius")
        ? (starRadius = parseFloat(star.radius._text))
        : (starRadius = 1);
      const starMesh = new THREE.Mesh(
        new THREE.SphereGeometry(starRadius * jupiterMass, 32, 32),
        material
      );

      let starGroup = new THREE.Group();

      starGroup.position.x = parseFloat(separation) / starsArraySize + i * 215;
      starGroup.add(starMesh);

      if (binaryGroup == null) {
        scene.add(starGroup);
      } else {
        binaryGroup.add(starGroup);
      }

      //render planets
      star.hasOwnProperty("planet") && renderPlanet(star.planet, starGroup);
    });
  };

  /**
   * Binary Renderer
   */
  const renderBinary = (binary, group = null) => {
    let binaryArray = [];
    Array.isArray(binary) ? (binaryArray = binary) : binaryArray.push(binary);

    if(group === null){
      group = new THREE.Group();
      scene.add(group);
    }

    binaryArray.map((binary) => {
      console.log(binary);

      binary.hasOwnProperty("star") &&
        renderStar(binary.star, (binary.hasOwnProperty("separation")? binary.separation._text : 500), group);

      binary.hasOwnProperty("binary") && renderBinary(binary.binary);
      
      //render planets
      binary.hasOwnProperty("planet") && renderPlanet(binary.planet, group);

    });
  };

  /**
   * Iterator
   */

  //contains binary
  system.system.hasOwnProperty("binary") && renderBinary(system.system.binary);

  //contains star
  system.system.hasOwnProperty("star") && renderStar(system.system.star);

  //contains planet
  system.system.hasOwnProperty("planet") && renderPlanet(system.system.planet);
};

generateSystem();

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
  4000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 500;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.enablePan = true;
// controls.screenSpacePanning = true;

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

gui.add(afterimagePass.uniforms["damp"], "value", 0.5, 1).step(0.001);
gui.add(params, "trails");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  allPlanetsArray.map((planet) => {
    planet.mesh.position.x = -(
      Math.sin(elapsedTime * (planet.period * 0.05)) * planet.semimajoraxis
    );

    planet.mesh.position.y =
      Math.cos(elapsedTime * (planet.period * 0.05)) *
      (Math.PI * planet.inclination);

    planet.mesh.position.z =
      Math.cos(elapsedTime * planet.period * 0.05) *
      (planet.semimajoraxis + planet.eccentricity);
  });

  // Render
  // renderer.render(scene, camera);
  if (params.trails) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
