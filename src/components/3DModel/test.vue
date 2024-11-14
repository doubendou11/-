<script setup>
import { onMounted, ref, reactive } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import ElectricMeterCard from '@/components/ElectricMeterCard.vue';

const container = ref(null);
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const models = reactive([]);
const camera = ref(null);
const cardPositions = reactive({});

onMounted(async () => {
  const aspectRatio = container.value.offsetWidth / container.value.offsetHeight;
  camera.value = new THREE.OrthographicCamera(-aspectRatio * 50, aspectRatio * 50, 50, -50, 1, 1000);
  camera.value.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
  renderer.setClearColor(0xe0e0e0, 0);
  container.value.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera.value, renderer.domElement);
  controls.addEventListener('change', () => updateAllPositions(models, camera.value, renderer));

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(50, 50, 50);
  scene.add(directionalLight);

  const modelData = [
    // Model data configurations
  ];

  await Promise.all(modelData.map(async (item) => {
    const gltf = await loader.loadAsync(item.url);
    gltf.scene.userData = item;
    scene.add(gltf.scene);
    models.push(gltf.scene);
  }));

  animate();
});

function animate() {
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
  
  const animate = () => {
    requestAnimationFrame(animate);
    updateAllPositions(models, camera.value, renderer);
    controls.update();
    renderer.render(scene, camera.value);
  };

  animate();
}

function updateAllPositions(models, camera, renderer) {
  models.forEach(model => {
    updatePosition(model, camera, renderer);
  });
  adjustForOverlaps();
}

function updatePosition(model, camera, renderer) {
  if (!model) return;
  const box = new THREE.Box3().setFromObject(model);
  const center = new THREE.Vector3();
  box.getCenter(center);
  center.applyMatrix4(model.matrixWorld);
  center.project(camera);

  const scale = Math.max(0.1, camera.zoom);
  const x = (center.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
  const y = (center.y * -0.5 + 0.5) * renderer.domElement.clientHeight;

  model.userData.style = {
    position: 'absolute',
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
    display: 'block'
  };
  cardPositions[model.userData.meterId] = { x, y, width: 200 * scale, height: 100 * scale, model };
}

function adjustForOverlaps() {
  const sortedCards = Object.values(cardPositions).sort((a, b) => a.y - b.y);  // Sort by vertical position
  sortedCards.forEach((card, i) => {
    for (let j = 0; j < i; j++) {
      const otherCard = sortedCards[j];
      if (isOverlapping(card, otherCard)) {
        card.y = otherCard.y + otherCard.height + 10;  // Adjust position
        const model = card.model;
        if (model) {
          model.userData.style.transform = `translate(-50%, -50%) translate(${card.x}px, ${card.y}px) scale(${model.userData.style.transform.match(/scale\(([^)]+)\)/)[1]})`;
        }
      }
    }
  });
}

function isOverlapping(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function updateCardStyle(card, model) {
  if (model) {
    model.userData.style.transform = `translate(-50%, -50%) translate(${card.x}px, ${card.y}px) scale(${model.userData.style.transform.match(/scale\(([^)]+)\)/)[1]})`;
  }
}
</script>
