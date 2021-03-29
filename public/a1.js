//ANCHOR create obj, obj meterial and transition
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  TextureLoader,
} from "/three/build/three.module.js";

//NOTE Create WebGL Renderer, antialias is remove obj border line
const renderer = new WebGLRenderer({ antialias: true });
//set canvas size
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
//NOTE create new scene
const scene = new Scene();
scene.background = new Color(0x202020);
//NOTE create camera and config fov:number aspect:number near:number far:number
const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  100.0
);
//set position of camera
camera.position.set(4, 4, 4);
//set camera's front to point at x:number, y:number, z:number
camera.lookAt(0, 0, 0);

//NOTE create texture loader
const textureLoader = new TextureLoader();
// load texture
const boxTexture = textureLoader.load("textures/grandma.png");

const deg = (n) => {
  return (n / 180) * Math.PI;
};

//NOTE create obj
// create box config width:float height:float depth:float widthSegments:int heightSegments:int depthSegments:int
const boxGeometry = new BoxGeometry(1, 1, 1);
// create box basic material ({color=0xffffff}) independent from every lighting
const material = new MeshBasicMaterial({ color: 0xf8008f, map: boxTexture });
// create new mesh(geometry, material)
const box = new Mesh(boxGeometry, material);
// set mesh position
box.position.x = 2;

const boxGeometry2 = new BoxGeometry(2, 2, 2);
const material2 = new MeshBasicMaterial({ color: 0x00f08f });
const box2 = new Mesh(boxGeometry2, material2);
box.position.x = -2;
box2.scale.set(0.5, 0.5, 0.5);
// create plane config width(x=1):float height(y=1):float widthSegments(1):int heightSegments(1):int
const planeGeometry = new PlaneGeometry(5, 5);
const material3 = new MeshBasicMaterial({ color: 0x0022f1 });
const plane = new Mesh(planeGeometry, material3);
plane.rotation.x = -deg(90);
plane.position.y = -0.5;

//NOTE add obj to scene can use separeatly
scene.add(box, box2, plane);

//NOTE assign transition or animation to obj
const updateFrame = () => {
  //2nd step command to render every frame //can use settimeout or setinterval instead but it have side effect about frame
  requestAnimationFrame(updateFrame);
  //3rd step move obj
  box.rotation.x += 0.01;
  box2.rotation.z += 0.01;
  //NOTE 1st step set Renderer
  renderer.render(scene, camera);
};

updateFrame();
