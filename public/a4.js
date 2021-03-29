//ANCHOR import dot gltf model
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  PCFSoftShadowMap,
  AmbientLight
} from "/three/build/three.module.js";
import { OrbitControls } from "/three/tools/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/three/tools/jsm/loaders/GLTFLoader.js";

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);
const scene = new Scene();

scene.background = new Color(0x202020);
const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  100.0
);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
// ambient light
const ambientLight = new AmbientLight(0xffffff, 1)
scene.add(ambientLight)
//NOTE create model loader
const loader = new GLTFLoader();
//load model
loader.load("/models/VikingRoom/scene.gltf", (model) => {
  scene.add(model.scene);
  console.log(model)
});

const controls = new OrbitControls(camera, renderer.domElement);

const updateFrame = () => {
  requestAnimationFrame(updateFrame);

  controls.update();

  renderer.render(scene, camera);
};

updateFrame();
