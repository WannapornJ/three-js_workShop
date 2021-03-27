import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  TextureLoader
} from "/three/build/three.module.js";

// Create WebGL Renderer
const renderer = new WebGLRenderer({ antialias: true });
//set canvas size
renderer.setSize(window.innerWidth, window.innerHeight);
// Add domElement to Body
document.body.appendChild(renderer.domElement);
// make scene
const scene = new Scene();
scene.background = new Color(0x202020);
// make camera and setting fov near far
const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  100.0
);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0)

//use texture
const textureLoader = new TextureLoader();
// comply texture to obj
const boxTexture = textureLoader.load("textures/grandma.png")

const deg = (n) => {
    return (n/180) * Math.PI;
}

// create obj
const boxGeometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({color: 0xf8008f ,map: boxTexture});
const box = new Mesh(boxGeometry, material);
box.position.x = 2

const boxGeometry2 = new BoxGeometry(2, 2, 2);
const material2 = new MeshBasicMaterial({ color: 0x00f08f });
const box2 = new Mesh(boxGeometry2, material2);
box.position.x = -2
box2.scale.set(0.5,0.5,0.5);

const planeGeometry = new PlaneGeometry(5, 5);
const material3 = new MeshBasicMaterial({ color: 0x0022f1})
const plane = new Mesh(planeGeometry, material3)
plane.rotation.x = -deg(90)
plane.position.y = -0.5
// add box to scene
scene.add(box,box2, plane);
//render function
const updateFrame = () => {
  //2nd step command to render every frame //can use settimeout or setinterval instead but it have side effect about frame
  requestAnimationFrame(updateFrame);
  //3rd step move obj
  box.rotation.x += 0.01;
  box2.rotation.z += 0.01;
  //1st step set Render
  renderer.render(scene, camera);
};

updateFrame();
