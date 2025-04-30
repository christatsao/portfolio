import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// in threejs, you always need a scene, a camera, anda  renderer
// scene == cnontainer that holds all of objects

const scene = new THREE.Scene();

// the perspective camera in threejs mimics what the human eyeballs see
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// the renderer renders everything in the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// camera.position.setZ(30);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

renderer.render(scene, camera) // renderer == DRAW

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

torus.position.set(30, 0, 0)

const pointLight = new THREE.PointLight(0xffffff, 100) //note: 0x is a hexadecimal literal that tells js that you are referring to a hexadecimal number and not a regular number

pointLight.position.set(0, 0, 0); //point light is like a small light bulb

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // ambient light lights up everything in the scene like an overhead light

scene.add(pointLight); // you must always add every object/light/shape to the scene
scene.add(ambientLight);


// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50, 0xFFFFFF, 0xFFFFFF);

// scene.add(lightHelper, gridHelper);



const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24); //to make a star, we combine a geometry and a material to become a mesh, and then add it to the scene
  const material = new THREE.MeshStandardMaterial({ color: 0xfff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // here we are destructuring an array  and assigning values to x y and z as three random integers [-50,50]

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar); // here we are just calling addStar 200 times (easier than a for loop)

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
console.log(spaceTexture)
scene.background = spaceTexture;


// Load the font
// const loader = new FontLoader();
// loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
//   const textGeometry = new TextGeometry('CHRISTA TSAO', {
//     font: font,
//     size: 3,
//     depth: 5,
//   });

//   const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const textMesh = new THREE.Mesh(textGeometry, textMaterial);

//   textMesh.rotation.x = 0;
//   textMesh.rotation.y = 0;
//   textMesh.rotation.z = 0;

//   textMesh.position.set(0, 0, 0); // adjust as needed
//   scene.add(textMesh);
// });



function animate() { // the animation / gameplay loop 
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;   //how much the torus rotates on every frame update of the loop
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera)
}

animate();



