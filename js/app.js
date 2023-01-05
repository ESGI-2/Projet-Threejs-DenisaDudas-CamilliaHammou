import * as THREE from 'three';
import { OrbitControls } from './threejs/examples/jsm/controls/OrbitControls.js';

//! Initialisation
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.1;
orbit.enablePan = false;

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.20);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xFFFFFF, 2, 200);
scene.add(pointLight);

const gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

//skydome
const textureloader = new THREE.TextureLoader();
const bgGeometry = new THREE.SphereGeometry(400, 40, 40);
const bgMaterial = new THREE.MeshStandardMaterial({
    map: textureloader.load("./assets/textures/space-background.jpg"),
    side: THREE.DoubleSide
})
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
scene.add(bg);

//! Création Soleil
const sunTexture = new THREE.TextureLoader()
const sunGeometry = new THREE.SphereGeometry(30, 100, 100)
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture.load("./assets/textures/sun-texture.jpg"),
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun);

//! Création Orbites
//* TERRE:
const orbitTerreRadius = 75;
const orbitTerreGeo = new THREE.TorusGeometry(orbitTerreRadius, 0.10, 32, 150);
const orbitTerreMat = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
});
const orbitTerre = new THREE.Mesh(orbitTerreGeo, orbitTerreMat);
scene.add(orbitTerre);
orbitTerre.rotation.x = THREE.MathUtils.degToRad(90);

//* MARS:
const orbitMarsRadius = 100;
const orbitMarsGeo = new THREE.TorusGeometry(orbitMarsRadius, 0.10, 32, 150);
const orbitMarsMat = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
});
const orbitMars = new THREE.Mesh(orbitMarsGeo, orbitMarsMat);
scene.add(orbitMars);
orbitMars.rotation.x = THREE.MathUtils.degToRad(90);

//* SATURNE:
const orbitSaturneRadius = 160;
const orbitSaturneGeo = new THREE.TorusGeometry(orbitSaturneRadius, 0.10, 32, 150);
const orbitSaturneMat = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
});
const orbitSaturne = new THREE.Mesh(orbitSaturneGeo, orbitSaturneMat);
scene.add(orbitSaturne);
orbitSaturne.rotation.x = THREE.MathUtils.degToRad(90);

//* LUNE:
const orbitLuneRadius = 10;
const orbitLuneGeo = new THREE.TorusGeometry(orbitLuneRadius, 0.10, 32, 150);
const orbitLuneMat = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
});
const orbitLune = new THREE.Mesh(orbitLuneGeo, orbitLuneMat);
orbitLune.position.x = 75;
orbitLune.rotation.z = THREE.MathUtils.degToRad(25);
orbitTerre.add(orbitLune);

//! Création Planètes:
//* TERRE:
const terreTexture = new THREE.TextureLoader();
const terreGeometry = new THREE.SphereGeometry(5, 100, 100);
const terreMaterial = new THREE.MeshStandardMaterial({
    map: terreTexture.load("./assets/textures/earth-texture.jpg"),
});
const terre = new THREE.Mesh(terreGeometry, terreMaterial);
terre.position.x = 75;
orbitTerre.add(terre);
terre.rotation.x = THREE.MathUtils.degToRad(-90);

//* MARS:
const marsTexture = new THREE.TextureLoader();
const marsGeometry = new THREE.SphereGeometry(3, 100, 100);
const marsMaterial = new THREE.MeshStandardMaterial({
    map: marsTexture.load("./assets/textures/mars-texture.jpg"),
});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.x = 100;
orbitMars.add(mars);
mars.rotation.x = THREE.MathUtils.degToRad(-90);

//* SATURNE:
const saturneTexture = new THREE.TextureLoader();
const saturneGeometry = new THREE.SphereGeometry(8, 100, 100);
const saturneMaterial = new THREE.MeshStandardMaterial({
    map: saturneTexture.load("./assets/textures/saturn-texture.jpg"),
});
const saturne = new THREE.Mesh(saturneGeometry, saturneMaterial);
saturne.position.x = 160;
orbitSaturne.add(saturne);
saturne.rotation.x = THREE.MathUtils.degToRad(-90);

//* ANNEAUX SATURNE:
const ringSaturneGeometry = new THREE.RingGeometry(8, 14, 64);
ringSaturneGeometry.rotateX(Math.PI / 1);
ringSaturneGeometry.rotateZ(Math.PI / 1);

const textureLoader = new THREE.TextureLoader();
const ringSaturneTexture = textureLoader.load('./assets/textures/saturn-ring-texture.png');
ringSaturneTexture.alphaMap = textureLoader.load('./assets/textures/saturn-ring-texture.png');

const ringSaturneMaterial = new THREE.MeshBasicMaterial({ map: ringSaturneTexture, transparent: true });
const ringSaturne = new THREE.Mesh(ringSaturneGeometry, ringSaturneMaterial);
ringSaturne.position.set(160, 0, 0);
ringSaturne.renderOrder = 1;
ringSaturne.rotation.z = THREE.MathUtils.degToRad(25);
orbitSaturne.add(ringSaturne);

//! Création de la LUNE:
const luneTexture = new THREE.TextureLoader();
const luneGeometry = new THREE.SphereGeometry(0.75, 100, 100);
const luneMaterial = new THREE.MeshStandardMaterial({
    map: luneTexture.load("./assets/textures/moon-texture.jpg"),
});
const lune = new THREE.Mesh(luneGeometry, luneMaterial);
lune.position.x = 10;
orbitLune.add(lune);
lune.rotation.x = THREE.MathUtils.degToRad(-90);

//! Animation:
function Animate() {
    var yAxis = new THREE.Vector3(0, 1, 0);
    var zAxis = new THREE.Vector3(0, 0, 1);

    sun.rotateOnAxis(yAxis, 0.01);

    orbitTerre.rotateOnAxis(zAxis, 0.001);
    orbitMars.rotateOnAxis(zAxis, 0.002);
    orbitSaturne.rotateOnAxis(zAxis, 0.003);
    orbitLune.rotateOnAxis(zAxis, 0.004);

    terre.rotateOnAxis(yAxis, 0.01);
    mars.rotateOnAxis(yAxis, 0.01);
    saturne.rotateOnAxis(yAxis, 0.01);
    ringSaturne.rotateOnAxis(zAxis, 0.01);
    lune.rotateOnAxis(yAxis, 0.01);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(Animate);

//! Resize fênetre
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
