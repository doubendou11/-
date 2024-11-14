<template>
    <div ref="container">
      <div id="tooltip" style="position: absolute; background: red; border: 1px solid black; padding: 5px; pointer-events: none;">
        电流: 10
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, reactive } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  
  const container = ref(null);
  const loader = new GLTFLoader();
  const models = reactive([]); // Using reactive to manage the models
  
  onMounted(async () => {
    const scene = new THREE.Scene();
    const aspectRatio = container.value.offsetWidth / container.value.offsetHeight;
    const frustumSize = 100;
    const halfFrustumSize = frustumSize / 2;
    const left = -halfFrustumSize * aspectRatio;
    const right = halfFrustumSize * aspectRatio;
    const top = halfFrustumSize;
    const bottom = -halfFrustumSize;
    const near = 1;
    const far = 1000;

    const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    camera.position.z = 50;
  
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
    renderer.setClearColor(0xe0e0e0, 0);
    container.value.appendChild(renderer.domElement);
  
    const controls = new OrbitControls(camera, renderer.domElement);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);
  
    try {
      const modelUrls = ['/model/factory/factory/factory.gltf'];
    // const modelUrls = ['/model/building/all/all.gltf'];
      const loadedModels = await Promise.all(modelUrls.map(url => loader.loadAsync(url)));
      loadedModels.forEach((gltf) => {
        scene.add(gltf.scene);
        models.push(gltf.scene); // Store loaded model scenes
      });
    } catch (error) {
      console.error('Failed to load models', error);
    }
  
    function updateTooltip(object, camera, renderer) {
      const tooltip = document.getElementById('tooltip');
      const vector = new THREE.Vector3();
  
      object.updateWorldMatrix(true, false);
      object.getWorldPosition(vector);
      vector.project(camera);
  
      const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
      const y = (vector.y * -0.5 + 0.5) * renderer.domElement.clientHeight;
  
      tooltip.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
      tooltip.innerHTML = `Value: ${object.userData.electricValue}`;
      tooltip.style.display = 'block';
    }
  
    const animate = () => {
      requestAnimationFrame(animate);
      if (models.length > 0) {
        updateTooltip(models[0], camera, renderer); // Update tooltip for the first model
      }
      controls.update();
      renderer.render(scene, camera);
    };
  
    animate();
  });
  </script>
  
  <style>
  /* Add any styles here */
  </style>
  