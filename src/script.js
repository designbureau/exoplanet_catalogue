import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import * as dat from "lil-gui";
import * as xmljs from "xml-js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import {
  getEllipse,
  getApoapsis,
  getPeriapsis,
  getSemiMinorAxis,
} from "./HelperFunctions";
import GenerateSystem from "./GenerateSystem";
import GenerateNav from "./GenerateNav";
import axios from "axios";

import systemDirectory from "./systemsDirectory";

/**
 * Base
 */

// Debug
const gui = new dat.GUI();
gui.close();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// Ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// // gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
// scene.add(ambientLight);

// // Directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
// directionalLight.position.set(-1, 1.5, 2.5);
// // gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
// // gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
// // gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
// // gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
// scene.add(directionalLight);

// const pointLight = new THREE.PointLight(0xffffff, 1, 5000);
// pointLight.position.set(0, 0, 0);

// gui.add(pointLight, "intensity").min(0).max(1).step(0.001);
// gui.add(pointLight, "distance").min(0).max(100000).step(1);
// gui.add(pointLight, "decay").min(0).max(1).step(0.001);

// scene.add(pointLight);

/**
 * textures
 */

const textureLoader = new THREE.TextureLoader();

/**
 * Materials
 */
// const material = new THREE.MeshNormalMaterial();
const material = new THREE.MeshStandardMaterial();
// material.wireframe = true;
// material.roughness = 0.7;
// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)

const starNormalTexture = textureLoader.load("/textures/8k_sun.jpeg");

// starNormalTexture.minFilter = THREE.NearestFilter;
// starNormalTexture.magFilter = THREE.NearestFilter;

const color = new THREE.Color(0xff0000);

const starMaterial = new THREE.MeshBasicMaterial({
  map: starNormalTexture,
  // color: color,
});

/**
 * Objects
 */

const systemParameters = {};
systemParameters.distance = 1;
systemParameters.speed = 0.01;
gui
  .add(systemParameters, "speed")
  .name("Orbit Speed")
  .min(0)
  .max(0.1)
  .step(0.001);

var options = {
  compact: true,
  ignoreComment: true,
  alwaysChildren: true,
};

// console.log(system);

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
  100000000
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
  none: false,
  movementSpeed: 1,
  rollSpeed: 0.005,
  dragToLook: false,
};

const controlsFolder = gui.addFolder("Camera Controls");
controlsFolder
  .add(controlParams, "orbit")
  .name("Orbit")
  .listen()
  .onChange(function () {
    setChecked("orbit");
  });
controlsFolder
  .add(controlParams, "none")
  .name("None")
  .listen()
  .onChange(function () {
    setChecked("none");
  });

controlsFolder
  .add(controlParams, "fly")
  .name("Fly")
  .listen()
  .onChange(function () {
    setChecked("fly");
  });

controlsFolder
  .add(controlParams, "movementSpeed")
  .name("Movement Speed")
  .min(0)
  .max(10)
  .step(0.01)
  .onChange(function () {
    if (controlParams.fly === true) {
      controls.movementSpeed = controlParams.movementSpeed;
    }
  });

controlsFolder
  .add(controlParams, "rollSpeed")
  .name("Roll Speed")
  .min(0)
  .max(0.1)
  .step(0.0001)
  .onChange(function () {
    if (controlParams.fly === true) {
      controls.rollSpeed = controlParams.rollSpeed;
    }
  });

controlsFolder.add(controlParams, "dragToLook").onChange(() => {
  if (controlParams.dragToLook === true) {
    controls.dragToLook = true;
  } else {
    controls.dragToLook = false;
  }
});

function setChecked(prop) {
  for (let param in controlParams) {
    controlParams[param] = false;
  }
  controlParams[prop] = true;
  controls.dispose();
  toggleControl();
}

let controls;

const toggleControl = () => {
  if (controlParams.orbit === true) {
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = false;
    canvas.classList.add("cursor-grab");
    canvas.classList.remove("cursor-crosshair");
  }
  if (controlParams.fly === true) {
    canvas.classList.remove("cursor-grab");
    canvas.classList.add("cursor-crosshair");
    controls = new FlyControls(camera, canvas);
    controls.movementSpeed = 1;
    controls.rollSpeed = 0.005;
    controls.autoForward = false;
    // controls.dragToLook = true;
    controls.enableDamping = true;
  }
  if (controlParams.none === true) {
  }
};

toggleControl();

/**
 * Pointer events
 */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener("mousemove", onMouseMove, false);

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

const trailsFolder = gui.addFolder("Trails");

trailsFolder.add(params, "trails");
trailsFolder.add(afterimagePass.uniforms["damp"], "value", 0.5, 1).step(0.001);

/**
 * Animate
 */
const clock = new THREE.Clock();

let currentIntersect = null;

window.addEventListener("click", () => {
  if (currentIntersect) {
    console.log(currentIntersect.object.type);
    console.log(currentIntersect.object);
    // console.log(currentIntersect.object.position);
    if (currentIntersect.object.objectType === "star") {
      controls.target = currentIntersect.object.parent.position;
    }
    if (currentIntersect.object.objectType === "planet") {
      controls.target = currentIntersect.object.position;
    }
  }
});

const systemNavToggle = document.getElementById("system_list_nav_toggle");
const systemsDirectory = systemDirectory();
const systemNav = document.getElementById("system_list_nav");
const systemList = document.createElement("ul");
systemNav.append(systemList);

systemNavToggle.addEventListener("click", (e) => {
  systemNav.classList.contains("hide")
    ? systemNav.classList.remove("hide")
    : systemNav.classList.add("hide");
});

systemsDirectory.map((system) => {
  const systemListItem = document.createElement("li");
  const systemItem = document.createElement("button");
  systemItem.setAttribute("data-system", system);
  systemItem.setAttribute("class", "system-button");
  systemItem.append(system.replace(".xml", ""));

  systemListItem.append(systemItem);
  systemList.append(systemListItem);

  systemItem.addEventListener("click", (e) => {
    const system = e.currentTarget.dataset.system;
    console.log(system);
    loadSystem(system);
  });
});

const nav = document.getElementById("system_nav");
const navToggle = document.getElementById("nav_toggle");
navToggle.addEventListener("click", (e) => {
  nav.classList.contains("hide")
    ? nav.classList.remove("hide")
    : nav.classList.add("hide");
});

const loadSystem = (system) => {
  scene.clear();
  systemNav.classList.add("hide");

  const url = "/data/systems/" + system;

  axios.get(url).then((response) => {
    let allPlanetsArray = [];
    let allStarsArray = [];
    let allLonePlanetsArray = [];

    let xml;
    let system;
    xml = response.data;
    system = xmljs.xml2js(xml, options);

    GenerateSystem(
      system,
      systemParameters,
      allPlanetsArray,
      allStarsArray,
      allLonePlanetsArray,
      scene,
      material,
      starMaterial
    );
    GenerateNav(allStarsArray, allLonePlanetsArray, scene, camera, controls);

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      const delta = clock.getDelta();

      allStarsArray.map((star) => {
        star.mesh.rotation.y = Math.PI * 0.005 * elapsedTime;
      });

      allPlanetsArray.map((planet) => {
        const ellipse = getEllipse(planet.semimajoraxis, planet.eccentricity);

        planet.mesh.position.x =
          ellipse.xRadius *
          Math.cos((elapsedTime / planet.period) * systemParameters.speed);

        planet.mesh.position.y =
          ellipse.yRadius *
          Math.sin((elapsedTime / planet.period) * systemParameters.speed);
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
      raycaster.setFromCamera(mouse, camera);

      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length) {
        if (!currentIntersect) {
          // console.log("mouse enter");
        }
        currentIntersect = intersects[0];
      } else {
        if (currentIntersect) {
          // console.log("mouse leave");
        }
        currentIntersect = null;
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  });
};
