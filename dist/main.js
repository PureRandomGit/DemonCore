// Basic Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = .5;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2.5;
controls.maxDistance = 20;
controls.minDistance = 2.5;
controls.enablePan = true;
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}
controls.touches = {
	ONE: THREE.TOUCH.ROTATE,
	TWO: THREE.TOUCH.DOLLY
}

// Adding lights
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight( 0xB1D9D9, 0xBF9000, 1 ); 
hemiLight.position.set(20, 100, 20);
scene.add(hemiLight);

const directLight = new THREE.DirectionalLight(0xffffff, 2.5);
directLight.position.set(40, 100, 20);
directLight.castShadow = true;
scene.add(directLight);

//Fog
scene.fog = new THREE.Fog( 0xc7f7f7, 10, 100 );

// Function to load GLTF Models
const loader = new THREE.GLTFLoader();
const models = [];

// Load ground GLTF model
loader.load('assets/ground.glb', function (gltf) {
    const ground = gltf.scene;
    ground.position.set(0, 0, 0); // Position the ground slightly below the models
    scene.add(ground);
});
loader.load('assets/sky.glb', function (gltf) {
    const sky = gltf.scene;
    sky.position.set(0, 0, 0); // Position the ground slightly below the models
    scene.add(sky);
});
loader.load('assets/lake.glb', function (gltf) {
    const lake = gltf.scene;
    lake.position.set(0, 0, 0); // Position the ground slightly below the models
    scene.add(lake);
});

// Load house models
for (let i = 1; i <= 10; i++) {
    loader.load(`assets/buildings/build${i}.glb`, function (gltf) {
        const model = gltf.scene;
        model.userData = { id: i };  // Store an ID in the model's userData
        // model.position.set((i - 5) * 3, 0, 0);  // Position the models
        models.push(model);
        scene.add(model);
    });
}

// Set camera position
camera.position.set(0, 4, 8);

// Click Detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        let parent = intersectedObject;

        // Traverse the parent hierarchy to find the object with userData
        while (parent && !parent.userData.id) {
            parent = parent.parent;
        }

        if (parent && parent.userData.id) {
            const id = parent.userData.id;
            if (id === 1) {
                showModal('House 1 clicked!');
            }
            if (id === 2) {
                showModal('House 2 clicked!');
            }
            if (id === 3) {
                showModal('House 3 clicked!');
            }
        }
    }
}

window.addEventListener('click', onMouseClick, false);

// Function to show modal
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const span = document.getElementsByClassName('close')[0];

    modalText.innerText = message;
    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
