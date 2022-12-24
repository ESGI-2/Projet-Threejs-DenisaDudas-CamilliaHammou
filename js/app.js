import * as THREE from 'three';
import { OrbitControls } from './threejs/examples/jsm/controls/OrbitControls.js';


//variable global

var _scene // Scene
var _renderer // Renderer
var _camera // Camera
var _control // Controle de la camera
var _clock = new THREE.Clock() // Timer
var _elapsedTime = 0 //  Durée écoulée entre la frame actuelle N et N-1

//function pour initialiser (etape 1 : initialisation)
function InitScene() {

    // Initialisation de la scene
    _scene = new THREE.Scene()

    // Initialisation du renderer, activation de l'anti aliasing et des ombres
    _renderer = new THREE.WebGLRenderer({ antialias: true })
    _renderer.shadowMap.enabled = true
    _renderer.shadowMap.type = THREE.PCFSoftShadowMap
    _renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(_renderer.domElement)

    // Initialisation et placement de la camera
    _camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    _camera.position.set(0, 2, 10)

    // Création du controle camera
    _control = new OrbitControls(_camera, _renderer.domElement)
    _control.enableDamping = true;
    _control.dampingFactor = 0.1;
    _control.enablePan = false
     
    //gridhelper
    const gridHelper = new THREE.GridHelper(100, 10)
    _scene.add(gridHelper)
    
     // Création d'une lumiere ambiante
     const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.25)
     _scene.add(ambientLight)
 
     // Création d'une lumiere directionelle
     const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
     directionalLight.position.set(-10, 10, 0)
     _scene.add(directionalLight)
 
    //skydome
    const skyGeo = new THREE.SphereGeometry(400, 10, 10);
    const loader  = new THREE.TextureLoader(),
    texture = loader.load( "./assets/textures/space-background.jpg" );
  
    const material = new THREE.MeshPhongMaterial({ 
        map: texture,
        side: THREE.BackSide
    });
    var sky = new THREE.Mesh(skyGeo, material);
    _scene.add(sky);

}

// Redimensionnement de la fenetre
function Resize() {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
    _renderer.setSize(window.innerWidth, window.innerHeight)
}

//boucle d'animation
function Animate() {

    // Mise à jour d'elapsed time
    _elapsedTime = _clock.getDelta()

    //  Definit l'axe souhaité pour la rotation (ici z)
    var zAxis = new THREE.Vector3(0, 0, 1)

    _renderer.render(_scene, _camera)
    requestAnimationFrame(Animate)
}
InitScene() //initialisation
Animate() //animation
window.addEventListener('resize', Resize); //window resize