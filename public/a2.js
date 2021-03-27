import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  SphereGeometry,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  TextureLoader,
} from "/three/build/three.module.js";

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new Scene();
scene.background = new Color(0x202020);
const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  100.0
);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);

const Torus = new TorusGeometry(10, 0.4, 16, 50, 6.3)

const sphereGeometry = new SphereGeometry(1, 32, 32);
const sphereMaterial = new MeshBasicMaterial({ color: 0xffff00 });
const sphere = new Mesh(sphereGeometry, sphereMaterial);

const wed = sphere.clone();
const wedMaterial = new MeshBasicMaterial({ color: 0x00f690 });
wed.scale.set(0.1, 0.1, 0.1);
wed.position.x = 2;
wed.material = wedMaterial;

const venus = sphere.clone();
const venusMaterial = new MeshBasicMaterial({ color: 0x008f90 });
venus.scale.set(0.2, 0.2, 0.2);
venus.position.x = 3;
venus.material = venusMaterial;

const earth = sphere.clone();
const earthMaterial = new MeshBasicMaterial({ color: 0x00ffff });
earth.scale.set(0.25, 0.25, 0.25);
earth.position.x = -4;
earth.material = earthMaterial;

const mars = sphere.clone();
const marsMaterial = new MeshBasicMaterial({ color: 0xaf2f40 });
mars.scale.set(0.25, 0.25, 0.25);
mars.position.x = 4.5;
mars.material = marsMaterial;


scene.add(sphere, wed, venus, earth, mars);

let init = 0,
  initMoon = 0;

const updateFrame = () => {
  requestAnimationFrame(updateFrame);
  wed.position.x = Math.cos(init) * 1.5;
  wed.position.z = -Math.sin(init) * 1.5;
  
  venus.position.x = -Math.cos(init) * 2;
  venus.position.z = Math.sin(init) * 2;

  //   venus.position.x = (Math.cos(initMoon) *1) + wed.position.x
  //   venus.position.z = (Math.sin(initMoon) *1) + wed.position.z

  earth.position.x = Math.cos(init) * 3;
  earth.position.z = Math.sin(init) * 3;

  mars.position.x = -(Math.cos(init) * 4);
  mars.position.z = -(Math.sin(init) * 4);
  init += 0.01;
  initMoon += 0.07;
  renderer.render(scene, camera);
};

updateFrame();
