import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000006);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const perspectiveCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1200);
perspectiveCamera.position.set(0, 0, 145);

const orthoSize = 155;
const orthographicCamera = new THREE.OrthographicCamera(-orthoSize, orthoSize, orthoSize, -orthoSize, 0.1, 1200);
orthographicCamera.position.copy(perspectiveCamera.position);

let activeCamera = perspectiveCamera;
activeCamera.lookAt(0, 0, 0);

const controls = new OrbitControls(activeCamera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.target.set(0, 0, 0);

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const loader = new THREE.TextureLoader();
const clock = new THREE.Clock();
const speedScale = 2.5;
const solarSystem = new THREE.Group();
scene.add(solarSystem);

const cameraUI = {
    Current_Camera: 'Perspective',
    Switch_Camera_Type: () => {
        const nextType = cameraUI.Current_Camera == 'Perspective' ? 'Orthogonal' : 'Perspective';
        changeCamera(nextType);
    }
};

const planetData = [
    { name: 'Mercury', radius: 1.5, distance: 20, color: '#a6a6a6', rotationSpeed: 0.02, orbitSpeed: 0.02, texture: 'Mercury.jpg' },
    { name: 'Venus',   radius: 3,   distance: 35, color: '#e39e1c', rotationSpeed: 0.015, orbitSpeed: 0.015, texture: 'Venus.jpg' },
    { name: 'Earth',   radius: 3.5, distance: 50, color: '#3498db', rotationSpeed: 0.01, orbitSpeed: 0.01, texture: 'Earth.jpg' },
    { name: 'Mars',    radius: 2.5, distance: 65, color: '#c0392b', rotationSpeed: 0.008, orbitSpeed: 0.008, texture: 'Mars.jpg' }
];

const planets = [];

const ambientLight = new THREE.AmbientLight(0x222222, 0.85);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffffff, 7300, 600);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const sunGeometry = new THREE.SphereGeometry(10, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
solarSystem.add(sun);

planetData.forEach((info, index) => {
    const orbit = new THREE.Group();
    orbit.rotation.y = index * 0.65 + 0.4;
    solarSystem.add(orbit);

    const map = loader.load(info.texture);
    map.colorSpace = THREE.SRGBColorSpace;

    const planetMaterial = new THREE.MeshStandardMaterial({
        map,
        color: info.color,
        roughness: 0.9,
        metalness: 0.02
    });

    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(info.radius, 48, 48),
        planetMaterial
    );
    planet.position.x = info.distance;
    orbit.add(planet);

    const folder = gui.addFolder(info.name);
    folder.add(info, 'rotationSpeed', 0, 0.08, 0.001).name('Rotation Speed');
    folder.add(info, 'orbitSpeed', 0, 0.08, 0.001).name('Orbit Speed');
    folder.open();

    planets.push({ info, planet, orbit });
});

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(cameraUI, 'Switch_Camera_Type').name('Switch Camera Type');
cameraFolder.add(cameraUI, 'Current_Camera').name('Current Camera').listen();
cameraFolder.open();

resizeCameras();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    resizeCameras();
});

function changeCamera(type) {   
    const oldCamera = activeCamera;
    activeCamera = type == 'Perspective' ? perspectiveCamera : orthographicCamera;

    activeCamera.position.copy(oldCamera.position);
    activeCamera.quaternion.copy(oldCamera.quaternion);
    controls.object = activeCamera;
    cameraUI.Current_Camera = type;

    resizeCameras();
    controls.update();
}

function resizeCameras() {
    const aspect = window.innerWidth / window.innerHeight;

    perspectiveCamera.aspect = aspect;
    perspectiveCamera.updateProjectionMatrix();

    orthographicCamera.left = -orthoSize * aspect;
    orthographicCamera.right = orthoSize * aspect;
    orthographicCamera.top = orthoSize;
    orthographicCamera.bottom = -orthoSize;
    orthographicCamera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);

    const dt = clock.getDelta() * 60;

    stats.update();
    controls.update();

    sun.rotation.y += 0.004 * dt * speedScale;

    planets.forEach(({ info, planet, orbit }) => {
        planet.rotation.y += info.rotationSpeed * dt * speedScale;

        orbit.rotation.y += info.orbitSpeed * dt * speedScale;
    });

    renderer.render(scene, activeCamera);
}

animate();
