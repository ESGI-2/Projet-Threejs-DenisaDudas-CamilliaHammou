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
    _camera.position.set(100, 20, 10)

    // Création du controle camera
    _control = new OrbitControls(_camera, _renderer.domElement)
    _control.enableDamping = true;
    _control.dampingFactor = 0.1;
    _control.enablePan = false

    //gridhelper
    const gridHelper = new THREE.GridHelper(100, 10)
    _scene.add(gridHelper)

     // Création d'une lumiere ambiante
     const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.20)
     _scene.add(ambientLight)

     // Création d'une point light
     //const pointLight = new THREE.PointLight( 0xff0000, 0.5, 0 );
     //pointLight.position.set( 0, 0, 0 );
     //_scene.add( pointLight );

     // Création d'une lumiere directionelle
     const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
     directionalLight.position.set(-10, 10, 0)
     _scene.add(directionalLight)

    //skydome
    const textureloader = new THREE.TextureLoader();
    const bgGeometry = new THREE.SphereGeometry(400, 40, 40);
    const bgMaterial = new THREE.MeshStandardMaterial({
        map: textureloader.load("./assets/textures/space-background.jpg"),
        side: THREE.DoubleSide
    })
    const bg = new THREE.Mesh(bgGeometry, bgMaterial);
    _scene.add(bg);

    //! Soleil
    const sunTexture = new THREE.TextureLoader()
    const sunGeometry = new THREE.SphereGeometry(30, 30, 30)
    const sunMaterial = new THREE.MeshStandardMaterial({
        map: sunTexture.load("./assets/textures/sun-texture.jpg"),
    });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
    _scene.add(sunMesh)

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