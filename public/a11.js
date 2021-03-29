//create obj and obj meterial
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  UnsignedByteType,
  PMREMGenerator,
  FogExp2,
  ACESFilmicToneMapping,
  SphereGeometry,
  MeshPhysicalMaterial,
  Mesh,
  TextureLoader,
  PCFSoftShadowMap,
} from "/three/build/three.module.js";
import { OrbitControls } from "/three/tools/jsm/controls/OrbitControls.js";
import { RGBELoader } from "/three/tools/jsm/loaders/RGBELoader.js";

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

document.body.appendChild(renderer.domElement);

const scene = new Scene();
scene.fog = new FogExp2(0x040301, 0.05);

const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  100.0
);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);

const pmrem = new PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();

const rgbLoader = new RGBELoader();
rgbLoader.setDataType(UnsignedByteType);
rgbLoader.load("textures/the_lost_city_2k.hdr", (m) => {
  const hdrMap = pmrem.fromEquirectangular(m);
  m.dispose();
  pmrem.dispose();
  scene.background = hdrMap.texture;
  scene.environment = hdrMap.texture;
});

const deg = (n) => {
  return (n / 180) * Math.PI;
};

const textureLoader = new TextureLoader();

// create obj
const sphereGeometry = new SphereGeometry(1, 32, 32);
const ball1Material = new MeshPhysicalMaterial({
	color: 0xffffff,
	map: textureLoader.load("textures/RockCliffs/smokagcp_2K_Albedo.jpg"),
	normalMap: textureLoader.load("textures/RockCliffs/smokagcp_2K_Normal.jpg"),
	roughnessMap: textureLoader.load("textures/RockCliffs/smokagcp_2K_Roughness.jpg"),
	displacementMap: textureLoader.load("textures/RockCliffs/smokagcp_2K_Displacement.jpg"),
	aoMap: textureLoader.load("textures/RockCliffs/smokagcp_2K_AO.jpg"),
	roughness: 0.1,
	displacementScale: 0.22,
	displacementBias: -0.1
});
const sphere = new Mesh(sphereGeometry, ball1Material);
sphere.castShadow = true;

scene.add(sphere);
const controls = new OrbitControls(camera, renderer.domElement);
//render function
const updateFrame = () => {
  //2nd step command to render every frame //can use settimeout or setinterval instead but it have side effect about frame
  requestAnimationFrame(updateFrame);
  controls.update();
  //1st step set Render
  renderer.render(scene, camera);
};

updateFrame();
