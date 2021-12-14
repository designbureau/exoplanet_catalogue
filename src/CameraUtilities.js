// /**
//  * Camera fit to object
//  */
import * as THREE from "three";
import { Vector3 } from "three";

export function fitCameraToSelection(
  camera,
  newTarget,
  controls,
  selection,
  fitOffset = 1.5,
  systemParameters
) {
  const box = new THREE.Box3();

  const object = selection;
  box.expandByObject(object);

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

  const oldSpeed = systemParameters.speed;
  let newSpeed = 0;

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance);

  // controls.maxDistance = distance * 10;

  systemParameters.speed = 0;

  controls.target.copy(newTarget);

  controls.target.set(newTarget.x, newTarget.y, newTarget.z);

  // camera.near = distance / 100;
  // camera.far = distance * 100;
  camera.updateProjectionMatrix();

  camera.position.copy(controls.target).sub(direction);
  controls.target = new Vector3(newTarget.x, newTarget.y, newTarget.z);

  systemParameters.speed = oldSpeed;

  controls.update();
}
