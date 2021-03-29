//add keyboard event
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
  PlaneGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Mesh,
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

const planeGeometry = new PlaneGeometry(100, 100);
const planeMaterial = new MeshStandardMaterial({ color: 0x000000 });
const ground = new Mesh(planeGeometry, planeMaterial);
ground.rotation.x = -Math.PI / 2;

console.log(ground);
scene.add(ground);

const loader = new GLTFLoader();
const animClip = {};
let mixer, rex, action;
loader.load("/models/vibrantRex.glb", (model) => {
  //how to show skeleton
  const helper = new SkeletonHelper(model.scene);
  scene.add(model.scene, helper);
  rex = model.scene;
  //create animation player (model that ahve animation)
  mixer = new AnimationMixer(model.scene);
  //play what animation?
//   mixer.clipAction(model.animations[0]).play();
//   mixer.clipAction(model.animations[1]).play();
  console.log(model);
  mixer = new AnimationMixer(model.scene);
  for(let i = 0; i < model.animations.length; i++)
  {
      animClip[model.animations[i].name] = model.animations[i];
  }

  action = animClip["idle"];
  mixer.clipAction(action).play();

});

const controls = new OrbitControls(camera, renderer.domElement);
const clock = new Clock();
let kU = false;
let kD = false;

const updateFrame = () => {
  requestAnimationFrame(updateFrame);

  if(kU) rex.position.z += 0.1;
  if(kD) rex.position.z -= 0.1;

  controls.update();
  if (mixer !== undefined) mixer.update(clock.getDelta());
  renderer.render(scene, camera);
};

const playAnimation = (clip) =>
{
	if(action != animClip[clip])
	{
		mixer.clipAction(action).stop();
		action = animClip[clip];
		mixer.clipAction(action).play();
	}
}

document.addEventListener("keydown", (e) => {
  console.log(e);
  switch (e.code) {
    case "ArrowUp":
      playAnimation("run");
      kU = true;
      break;
    case "ArrowDown":
      playAnimation("run");
      kD = true;
      break;
  }
  //if(e.code == "Space"){ changeAnimation(); }
});

document.addEventListener("keyup", (e) => {
  console.log(e);
  switch (e.code) {
    case "ArrowUp":
      playAnimation("idle");
      kU = false;
      break;
    case "ArrowDown":
      playAnimation("idle");
      kD = false;
      break;
  }
  //if(e.code == "Space"){ changeAnimation(); }
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

updateFrame();
