<template>
  <div ref="container">
    <div id="tooltip" style="position: absolute; 
     background: red; border: 1px solid black; padding: 5px; pointer-events: none;">
      电流: 10</div>

    <p>ceshi</p>


  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const container = ref(null);
const loader = new GLTFLoader();


//设定提示渲染程序
function updateTooltip(object, camera, renderer) {
  const tooltip = document.getElementById('tooltip');
  const vector = new THREE.Vector3();

  // Project the 3D position to 2D
  object.updateWorldMatrix(true, false);
  object.getWorldPosition(vector);
  vector.project(camera);

  // Convert the normalized position (-1, +1) in both axes to canvas pixel coordinates
  const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
  const y = (vector.y * -0.5 + 0.5) * renderer.domElement.clientHeight;

  // Update tooltip position and content
  tooltip.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
  tooltip.innerHTML = `Value: ${object.userData.electricValue}`;
  tooltip.style.display = 'block';
}


onMounted(async () => {
  const scene = new THREE.Scene();
  //定义正交相机，frustumSize 表示呈现的范围，值越大，物体就会显得越小。
  const aspectRatio = container.value.offsetWidth / container.value.offsetHeight;
  // Define the frustum dimensions
  const frustumSize = 100;
  const halfFrustumSize = frustumSize / 2;
  const left = -halfFrustumSize * aspectRatio;
  const right = halfFrustumSize * aspectRatio;
  const top = halfFrustumSize;
  const bottom = -halfFrustumSize;
  const near = 1;
  const far = 1000;

  // Create an OrthographicCamera
  const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
  camera.position.z = 50; // Position the camera away from the origin

  // const camera = new THREE.PerspectiveCamera(75, container.value.offsetWidth / container.value.offsetHeight, 0.1, 1000);
  //  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
  renderer.setClearColor(0xe0e0e0, 0); //  A light grey background
  container.value.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Lighting
  // const light = new THREE.DirectionalLight(0xffffff, 2);
  // light.position.set(0, 1, 1);
  // scene.add(light);

  // Ambient Light

  // Directional Light - Increase Intensity or Add More
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(50, 50, 50);
  scene.add(directionalLight);

  try {
    const modelUrls = ['/model/factory/factory/factory.gltf'];
    console.log("Attempting to load model from URL:", modelUrls[0]);
    const models = await Promise.all(modelUrls.map(url => loader.loadAsync(url)));

    models.forEach((gltf) => {
      scene.add(gltf.scene);
    });
  } catch (error) {
    console.error('Failed to load models', error);
  }

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    // updateTooltip(models[0], camera, renderer);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
});
</script>

<style></style>