//ANCHOR shadow
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  PlaneGeometry,
  PointLight,
  DirectionalLight,
  PCFSoftShadowMap,
  FogExp2,
} from "/three/build/three.module.js";
import { OrbitControls } from "/three/tools/jsm/controls/OrbitControls.js";

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
//NOTE assign type of shadow
renderer.shadowMap.type = PCFSoftShadowMap;
// enable to use shadow when render
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);
const scene = new Scene();
//NOTE blend horizon edge with scene color
scene.fog = new FogExp2(0x202020, 0.02);

scene.background = new Color(0x202020);
const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  100.0
);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);

//NOTE MeshStandardMaterial depend on lighting
const sphereGeometry = new SphereGeometry(1, 32, 32);
const sphereMaterial = new MeshStandardMaterial({
  color: 0xffff00,
  //value of brightening
  emissive: 0xffff00,
});
const sphere = new Mesh(sphereGeometry, sphereMaterial);
//detect this obj shadow and this attribute can inheritance to child
sphere.castShadow = true;

const wed = sphere.clone();
const wedMaterial = new MeshStandardMaterial({ color: 0x00f690 });
wed.scale.set(0.1, 0.1, 0.1);
wed.position.x = 2;
wed.material = wedMaterial;
wed.castShadow = true;

const venus = sphere.clone();
const venusMaterial = new MeshStandardMaterial({ color: 0x008f90 });
venus.scale.set(0.2, 0.2, 0.2);
venus.position.x = 3;
venus.material = venusMaterial;
venus.castShadow = true;

const earth = sphere.clone();
const earthMaterial = new MeshStandardMaterial({ color: 0x00ffff });
earth.scale.set(0.25, 0.25, 0.25);
earth.position.x = -4;
earth.material = earthMaterial;
earth.castShadow = true;

const moon = earth.clone();
const moonMaterial = new MeshStandardMaterial({ color: 0xfcfc00 });
moon.scale.set(0.1, 0.1, 0.1);
moon.material = moonMaterial;
moon.castShadow = true;

const mars = sphere.clone();
const marsMaterial = new MeshStandardMaterial({ color: 0xaf2f40 });
mars.scale.set(0.25, 0.25, 0.25);
mars.position.x = 4.5;
mars.material = marsMaterial;
mars.castShadow = true;

const deg = (n) => {
  return (n / 180) * Math.PI;
};

const planeGeometry = new PlaneGeometry(100, 100);
const planeMaterial = new MeshStandardMaterial({ color: 0xffffff });
const floor = new Mesh(planeGeometry, planeMaterial);
floor.castShadow = false;
//show detected shadow on this obj
floor.receiveShadow = true;
floor.rotation.x = -deg(90);
floor.position.y = -1;

//NOTE create light
//point light
const lighter = new PointLight(0x8f2f00, 2, 20);
//directional light
const directionalLighter = new DirectionalLight(0xffffff, 0.1);
directionalLighter.position.set(0, 15, 0);
directionalLighter.castShadow = true;
scene.add(
  sphere,
  wed,
  venus,
  earth,
  mars,
  lighter,
  moon,
  floor,
  directionalLighter
);

let init = 0,
  initMoon = 0;

  //NOTE control camera angle on the scene
const controls = new OrbitControls(camera, renderer.domElement);

const updateFrame = () => {
  requestAnimationFrame(updateFrame);
  wed.position.x = Math.cos(init) * 1.5;
  wed.position.z = -Math.sin(init) * 1.5;

  venus.position.x = -Math.cos(init) * 2;
  venus.position.z = Math.sin(init) * 2;

  moon.position.x = Math.cos(initMoon) * 0.8 + earth.position.x;
  moon.position.z = Math.sin(initMoon) * 0.8 + earth.position.z;

  earth.position.x = Math.cos(init) * 3;
  earth.position.z = Math.sin(init) * 3;

  mars.position.x = -(Math.cos(init) * 4);
  mars.position.z = -(Math.sin(init) * 4);
  init += 0.01;
  initMoon += 0.05;

  controls.update();

  renderer.render(scene, camera);
};

updateFrame();
