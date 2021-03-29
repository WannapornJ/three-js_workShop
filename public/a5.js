//animation and bone
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  PCFSoftShadowMap,
  AmbientLight,
  SkeletonHelper,
  AnimationMixer,
  Clock,
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

const ambientLight = new AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const loader = new GLTFLoader();
let mixer;
loader.load("/models/vibrantRex.glb", (model) => {
  //how to show skeleton
  const helper = new SkeletonHelper(model.scene);
  scene.add(model.scene, helper);
  //create animation player (model that ahve animation)
  mixer = new AnimationMixer(model.scene);
  //play what animation?
  mixer.clipAction(model.animations[0]).play();
  mixer.clipAction(model.animations[1]).play();
  console.log(model);
});

const controls = new OrbitControls(camera, renderer.domElement);
const clock = new Clock();

const updateFrame = () => {
  requestAnimationFrame(updateFrame);

  controls.update();
  if(mixer !== undefined) mixer.update(clock.getDelta());
  renderer.render(scene, camera);

};


window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
})

updateFrame();
