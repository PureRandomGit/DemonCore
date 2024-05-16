// Basic Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Adding lights
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Function to load GLTF Models
const loader = new THREE.GLTFLoader();
const models = [];

// Load ground GLTF model
loader.load('public/ground.glb', function (gltf) {
    const ground = gltf.scene;
    ground.position.set(0, 0, 0); // Position the ground slightly below the models
    scene.add(ground);
});

// Load house models
for (let i = 1; i <= 10; i++) {
    loader.load(`public/buildings/house${i}.glb`, function (gltf) {
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
