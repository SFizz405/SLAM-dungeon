import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0px";
renderer.domElement.style.left = "0px";
renderer.domElement.style.zIndex = "-1";
document.body.appendChild(renderer.domElement);

const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

camera.position.set(0, 20, 0);

const planeMesh = new THREE.InstancedMesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }),
  window.pgmObject.width * window.pgmObject.height
);
scene.add(planeMesh);

const wallMesh = new THREE.InstancedMesh(
  new THREE.BoxGeometry(1, 20, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true }),
  window.pgmObject.width * window.pgmObject.height
);
scene.add(wallMesh);

const count = { plane: 0, wall: 0 };

const dummy = new THREE.Object3D();

for (let y = 0; y < window.pgmObject.height; y++) {
  for (let x = 0; x < window.pgmObject.width; x++) {
    const index = y * window.pgmObject.width + x;
    const color = window.pgmObject.data.data[index];

    if (color === 254) {
      dummy.position.set(y, 0, -x);
      dummy.rotation.x = Math.PI / 2;

      dummy.updateMatrix();
      planeMesh.setMatrixAt(count.plane, dummy.matrix);
      count.plane++;
    } else if (color === 0) {
      dummy.position.set(y, 10, -x);
      dummy.rotation.x = 0;

      dummy.updateMatrix();
      wallMesh.setMatrixAt(count.wall, dummy.matrix);
      count.wall++;
    }
  }
}

planeMesh.count = count.plane;
wallMesh.count = count.wall;

const velocity = 0.2;

const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false,
  shift: false,
};

const onKeyDown = function (event) {
  if (event.code === "KeyW") keys.w = true;
  if (event.code === "KeyA") keys.a = true;
  if (event.code === "KeyS") keys.s = true;
  if (event.code === "KeyD") keys.d = true;
  if (event.code === "Space") keys.space = true;
  if (event.code === "ShiftLeft") keys.shift = true;
};

const onKeyUp = function (event) {
  if (event.code === "KeyW") keys.w = false;
  if (event.code === "KeyA") keys.a = false;
  if (event.code === "KeyS") keys.s = false;
  if (event.code === "KeyD") keys.d = false;
  if (event.code === "Space") keys.space = false;
  if (event.code === "ShiftLeft") keys.shift = false;
};

function animate() {
  requestAnimationFrame(animate);

  if (keys.w) controls.moveForward(velocity);
  if (keys.a) controls.moveRight(-velocity);
  if (keys.s) controls.moveForward(-velocity);
  if (keys.d) controls.moveRight(velocity);
  if (keys.space) controls.getObject().position.y += velocity;
  if (keys.shift) controls.getObject().position.y -= velocity;

  renderer.render(scene, camera);
}

animate();

renderer.domElement.addEventListener("click", () => controls.lock());

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
