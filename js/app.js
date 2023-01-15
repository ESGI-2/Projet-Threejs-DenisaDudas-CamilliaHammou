import * as THREE from 'three';
import { OrbitControls } from './threejs/examples/jsm/controls/OrbitControls.js';
import { GUI } from './dat.gui/dat.gui.module.js';

//! variables globales
var _scene // Scene
var _renderer // Renderer
var _camera // Camera
var _clock = new THREE.Clock(); // Timer
var _control // Controle de la camera
var _elapsedTime = 0;
var _gridHelper;
var _orbitTerre;
var _orbitLune;
var _orbitMars;
var _orbitSaturne;
var _sun;
var _terre;
var _lune;
var _mars;
var _saturne;
var _focusTerreEnabled = false // = true si le focus de la Terre est activé
var _focusSunEnabled = false;
var _focusLuneEnabled = false;
var _focusMarsEnabled = false;
var _focusSaturneEnabled = false;
var _asteroidsParent;
var _asteroidMesh;

var DatGUISettings = { // Parametres disponible dans le menu dat GUI
    orbitColor: 0xffffff,
    vitesse: 1,
    gridHelper: true,
    asteroidCount: 100
}

//! Initialisations
// Initialisation de la scene
_scene = new THREE.Scene();

// Initialisation du renderer, activation de l'anti aliasing et des ombres
_renderer = new THREE.WebGLRenderer({ antialias: true });
_renderer.shadowMap.enabled = true
_renderer.shadowMap.type = THREE.PCFSoftShadowMap
_renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(_renderer.domElement);

// Initialisation et placement de la camera
_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
_camera.position.set(-90, 140, 140);

 // Création du controle camera
_control = new OrbitControls(_camera, _renderer.domElement);
_control.enableDamping = true;
_control.dampingFactor = 0.1;
_control.enablePan = false;

// Création d'une lumiere ambiante
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.20);
_scene.add(ambientLight);
// Création de la lumière du soleil
const pointLight = new THREE.PointLight(0xFFFFFF, 2, 450);
_scene.add(pointLight);

// Création du gridhelper
_gridHelper = new THREE.GridHelper(100, 10);
_scene.add(_gridHelper);

// Création du skydome
const textureloader = new THREE.TextureLoader();
const bgGeometry = new THREE.SphereGeometry(400, 40, 40);
const bgMaterial = new THREE.MeshStandardMaterial({
    map: textureloader.load("./assets/textures/space-background.jpg"),
    side: THREE.DoubleSide
})
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
_scene.add(bg);

//! Fin Initialisations

//! Création Soleil
const sunTexture = new THREE.TextureLoader()
const sunGeometry = new THREE.SphereGeometry(30, 100, 100)
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture.load("./assets/textures/sun-texture.jpg"),
});
_sun = new THREE.Mesh(sunGeometry, sunMaterial)
_scene.add(_sun);

//! Création Orbites
//* TERRE:
const orbitTerreRadius = 75;
const orbitTerreGeo = new THREE.TorusGeometry(orbitTerreRadius, 0.10, 32, 150);
const orbitTerreMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
});
_orbitTerre = new THREE.Mesh(orbitTerreGeo, orbitTerreMat);
_scene.add(_orbitTerre);
_orbitTerre.rotation.x = THREE.MathUtils.degToRad(90);

//* MARS:
const orbitMarsRadius = 100;
const orbitMarsGeo = new THREE.TorusGeometry(orbitMarsRadius, 0.10, 32, 150);
const orbitMarsMat = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
});
_orbitMars = new THREE.Mesh(orbitMarsGeo, orbitMarsMat);
_scene.add(_orbitMars);
_orbitMars.rotation.x = THREE.MathUtils.degToRad(90);

//* SATURNE:
const orbitSaturneRadius = 160;
const orbitSaturneGeo = new THREE.TorusGeometry(orbitSaturneRadius, 0.10, 32, 150);
const orbitSaturneMat = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
});
_orbitSaturne = new THREE.Mesh(orbitSaturneGeo, orbitSaturneMat);
_scene.add(_orbitSaturne);
_orbitSaturne.rotation.x = THREE.MathUtils.degToRad(90);

//* LUNE:
const orbitLuneRadius = 10;
const orbitLuneGeo = new THREE.TorusGeometry(orbitLuneRadius, 0.10, 32, 150);
const orbitLuneMat = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
});
_orbitLune = new THREE.Mesh(orbitLuneGeo, orbitLuneMat);
_orbitLune.position.x = 75;
_orbitLune.rotation.y = THREE.MathUtils.degToRad(25);
_orbitTerre.add(_orbitLune);

//! Création Planètes:
//* TERRE:
const terreTexture = new THREE.TextureLoader();
const terreGeometry = new THREE.SphereGeometry(5, 100, 100);
const terreMaterial = new THREE.MeshStandardMaterial({
    map: terreTexture.load("./assets/textures/earth-texture.jpg"),
});
_terre = new THREE.Mesh(terreGeometry, terreMaterial);
_terre.position.x = 75;
_orbitTerre.add(_terre);
_terre.rotation.x = THREE.MathUtils.degToRad(-90);  //rotation bonne position

//* MARS:
const marsTexture = new THREE.TextureLoader();
const marsGeometry = new THREE.SphereGeometry(3, 100, 100);
const marsMaterial = new THREE.MeshStandardMaterial({
    map: marsTexture.load("./assets/textures/mars-texture.jpg"),
});
_mars = new THREE.Mesh(marsGeometry, marsMaterial);
_mars.position.x = 100;
_orbitMars.add(_mars);
_mars.rotation.x = THREE.MathUtils.degToRad(-90);

//* SATURNE:
const saturneTexture = new THREE.TextureLoader();
const saturneGeometry = new THREE.SphereGeometry(8, 100, 100);
const saturneMaterial = new THREE.MeshStandardMaterial({
    map: saturneTexture.load("./assets/textures/saturn-texture.jpg"),
});
_saturne = new THREE.Mesh(saturneGeometry, saturneMaterial);
_saturne.position.x = 160;
_orbitSaturne.add(_saturne);
_saturne.rotation.x = THREE.MathUtils.degToRad(-90);

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
ringSaturne.rotation.y = THREE.MathUtils.degToRad(25);
_orbitSaturne.add(ringSaturne);

//! Création de la LUNE:
const luneTexture = new THREE.TextureLoader();
const luneGeometry = new THREE.SphereGeometry(0.75, 100, 100);
const luneMaterial = new THREE.MeshStandardMaterial({
    map: luneTexture.load("./assets/textures/moon-texture.jpg"),
});
_lune = new THREE.Mesh(luneGeometry, luneMaterial);
_lune.position.x = 10;
_orbitLune.add(_lune);
_lune.rotation.x = THREE.MathUtils.degToRad(-90);

//! Création des asteroides
_asteroidsParent = new THREE.Object3D();

var asteroid_count = 100;

var min_radius = 110;
var max_radius = 140;

for (var i = 0; i < asteroid_count; i++) {

    var asteroidGeometry = new THREE.DodecahedronGeometry();
    var asteroidMaterial = new THREE.MeshStandardMaterial({color: 0x484848}); // added brown color
    _asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

    var radius = Math.random() * (max_radius - min_radius) + min_radius;
    var angle = Math.random() * 2 * Math.PI;
    _asteroidMesh.position.set(
        radius * Math.cos(angle),0,radius * Math.sin(angle)
        );
        _asteroidsParent.add(_asteroidMesh);
    }
    _scene.add(_asteroidsParent);

//! Click boutons pour focus sur les planètes
function OnClickFocusSun() {
    _focusSunEnabled = true
}

function OnClickFocusTerre() {
    _focusTerreEnabled = true
}

function OnClickFocusLune() {
    _focusLuneEnabled = true
}

function OnClickFocusMars() {
    _focusMarsEnabled = true
}

function OnClickFocusSaturne() {
    _focusSaturneEnabled = true
}

document.getElementById("button-soleil").removeEventListener("click", OnClickFocusSun);
document.getElementById("button-soleil").addEventListener("click", OnClickFocusSun);
document.getElementById("button-terre").addEventListener("click", OnClickFocusTerre);
document.getElementById("button-lune").addEventListener("click", OnClickFocusLune);
document.getElementById("button-mars").addEventListener("click", OnClickFocusMars);
document.getElementById("button-saturne").addEventListener("click", OnClickFocusSaturne);

//! Fonction qui permet d'initialiser l'UI Dat.GUI
function InitDatGUI() {
    const gui = new GUI();
    // Création des parametres
    const solarSystemSettings = gui.addFolder("Parametres du Système Solaire");
    solarSystemSettings.add(DatGUISettings, "vitesse", 1, 365, 0.1).name("Vitesse")
    solarSystemSettings.add(DatGUISettings, "asteroidCount", 100, 300).name("Asteroides").onChange(OnChangeAteroidCount);
    solarSystemSettings.addColor(DatGUISettings, "orbitColor").name("Orbites").onChange(OnChangeOrbitColor);
    solarSystemSettings.add(DatGUISettings, "gridHelper").name("Activer/Désactiver la Grille").onChange(OnChangeGridHelper);
    solarSystemSettings.open();
}

// Fonction appelée lors du changement de la couleur
function OnChangeOrbitColor() {
    _orbitTerre.material.color.setHex(DatGUISettings.orbitColor)
    _orbitLune.material.color.setHex(DatGUISettings.orbitColor)
    _orbitMars.material.color.setHex(DatGUISettings.orbitColor)
    _orbitSaturne.material.color.setHex(DatGUISettings.orbitColor)
}

// Fonction appelée lors du changement des nombres d'asteroides
function OnChangeAteroidCount(value) {
    asteroid_count = value;

    _scene.children.forEach(child => {
        if(child._asteroidMesh) _scene.remove(child);
      });

    for (var i = 0; i < asteroid_count; i++) {
        var asteroidGeometry = new THREE.DodecahedronGeometry();
        var asteroidMaterial = new THREE.MeshStandardMaterial({color: 0x484848});
        _asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

        var radius = Math.random() * (max_radius - min_radius) + min_radius;
        var angle = Math.random() * 2 * Math.PI;
        _asteroidMesh.position.set(
            radius * Math.cos(angle),0,radius * Math.sin(angle)
            );
            _asteroidsParent.add(_asteroidMesh);
    }
    _scene.add(_asteroidsParent);
}

// Fonction appelée pour activer et desactiver le gridhelper
function OnChangeGridHelper(value) {
    if (value == true)
        _scene.add(_gridHelper);
    else
        _scene.remove(_gridHelper);
}


//! Animation:
function Animate() {
    // Mise à jour d'elapsed time
    _elapsedTime = _clock.getDelta();

    // Definition des axes
    var yAxis = new THREE.Vector3(0, 1, 0);
    var zAxis = new THREE.Vector3(0, 0, -1);

    // Rotation du Soleil
    _sun.rotateOnAxis(yAxis, 0.27 * _elapsedTime * DatGUISettings.vitesse);

    //! Rotation des planetes sur leur orbites
    _orbitTerre.rotateOnAxis(zAxis, 0.0360 * _elapsedTime * DatGUISettings.vitesse);
    _orbitMars.rotateOnAxis(zAxis, 0.0687 * _elapsedTime * DatGUISettings.vitesse);
    _orbitSaturne.rotateOnAxis(zAxis, 0.010755 * _elapsedTime * DatGUISettings.vitesse);
    _orbitLune.rotateOnAxis(zAxis, 0.27 * _elapsedTime * DatGUISettings.vitesse);

    //! Rotation des planetes sur elles mêmes
    _terre.rotateOnAxis(yAxis, 1.0 * _elapsedTime * DatGUISettings.vitesse);
    _mars.rotateOnAxis(yAxis, 1.0 * _elapsedTime * DatGUISettings.vitesse);
    _saturne.rotateOnAxis(yAxis, 0.5 * _elapsedTime * DatGUISettings.vitesse);
    ringSaturne.rotateOnAxis(zAxis, 0.5 * _elapsedTime * DatGUISettings.vitesse);
    _lune.rotateOnAxis(yAxis, 0.27 * _elapsedTime * DatGUISettings.vitesse);

    //! Asteroides
    _asteroidsParent.rotateOnAxis(yAxis, 0.03 * _elapsedTime * DatGUISettings.vitesse);

    //! Focus lors du click sur les boutons
    //* Si le focus de la Terre est activé

    if (_focusTerreEnabled == true) {
        // On définit une position de la camera par rapport à la terre
        var offset = new THREE.Vector3(0, 5, 30);
        // declare un vector3d pour la position de la terre
        var terrePosition = new THREE.Vector3();
        // enregistre la position de la terre dans terrePosition
        _terre.getWorldPosition(terrePosition);
        // applique la position au control
        var controlPosition = terrePosition.add(offset);
        _control.object.position.copy(controlPosition);
        //focus
        _control.target = terrePosition;
    }

    //* Si le focus du Soleil est activé
    if (_focusSunEnabled == true) {
        var offset = new THREE.Vector3(0, 20, 140);
        var sunPosition = new THREE.Vector3();
        _sun.getWorldPosition(sunPosition);
        var controlPosition = sunPosition.add(offset);
        _control.object.position.copy(controlPosition);
        _control.target = sunPosition;
    }

    //* Si le focus de la Lune est activé
    if (_focusLuneEnabled == true) {
        var offset = new THREE.Vector3(0, 0, 5);
        var lunePosition = new THREE.Vector3();
        _lune.getWorldPosition(lunePosition);
        var controlPosition = lunePosition.add(offset);
        _control.object.position.copy(controlPosition);
        _control.target = lunePosition;
    }

    //* Si le focus de Mars est activé
    if (_focusMarsEnabled == true) {
        var offset = new THREE.Vector3(0, 0, 10);
        var marsPosition = new THREE.Vector3();
        _mars.getWorldPosition(marsPosition);
        var controlPosition = marsPosition.add(offset);
        _control.object.position.copy(controlPosition);
        _control.target = marsPosition;
    }

    //* Si le focus de Saturne est activé
    if (_focusSaturneEnabled == true) {
        var offset = new THREE.Vector3(0, 0, 20);
        var saturnePosition = new THREE.Vector3();
        _saturne.getWorldPosition(saturnePosition);
        var controlPosition = saturnePosition.add(offset);
        _control.object.position.copy(controlPosition);
        _control.target = saturnePosition;
    }

    _control.update();
    _renderer.render(_scene, _camera);
    requestAnimationFrame(Animate)
}

//! Resize fênetre
function Resize() {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
    _renderer.setSize(window.innerWidth, window.innerHeight)
}

Animate();
InitDatGUI();
window.addEventListener('resize', Resize);
