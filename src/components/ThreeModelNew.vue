<template>
    <div ref="container">
      <ElectricMeterCard
        v-if="selectedObject"
        :meterId="selectedObject.userData.meterId"
        :deviceName="selectedObject.userData.deviceName"
        :currents="selectedObject.userData.currents"
        :power="selectedObject.userData.power"
        ref="electricMeterCard"
        style="position: absolute; display: none;"
      />
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, reactive } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import ElectricMeterCard from '@/components/binhui/ElectricMeterCard.vue';
  
  const container = ref(null);
  const electricMeterCard = ref(null);
  const loader = new GLTFLoader();
  const scene = new THREE.Scene();
  const models = reactive([]);
  const selectedObject = ref(null);
  
  onMounted(async () => {
    const aspectRatio = container.value.offsetWidth / container.value.offsetHeight;
    const camera = new THREE.OrthographicCamera(-aspectRatio * 50, aspectRatio * 50, 50, -50, 1, 1000);
    camera.position.z = 50;
  
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
    renderer.setClearColor(0xe0e0e0, 0);
    container.value.appendChild(renderer.domElement);
  
    const controls = new OrbitControls(camera, renderer.domElement);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);
  
    try {
      // const modelUrls = ['/model/factory/factory/factory.gltf'];
      const modelUrls = ['/model/lgc_combine/330suojingji/55.gltf','/model/lgc_combine/330chongbeiji/51.gltf','/model/lgc_combine/500chongbeiji/14.gltf','/model/lgc_combine/500kaijuanji/9.gltf',
        '/model/lgc_combine/500lashengji1/47.gltf','/model/lgc_combine/500lashengji2/48.gltf','/model/lgc_combine/500lashengji4/10.gltf','/model/lgc_combine/500lashengji5/69.gltf',
        '/model/lgc_combine/500lashengji6/67.gltf','/model/lgc_combine/500lashengji7/68.gltf','/model/lgc_combine/500lashengji8/49.gltf','/model/lgc_combine/500qingxiji/65.gltf',
        '/model/lgc_combine/caiyingji/52.gltf','/model/lgc_combine/factory/factory.gltf','/model/lgc_combine/neituhongxiang/54.gltf'
      ];
      const loadedModels = await Promise.all(modelUrls.map(url => loader.loadAsync(url)));
      loadedModels.forEach((gltf) => {
        gltf.scene.userData = {
          meterId: '55',
          deviceName: '330suojingji',
          currents: { a: 10, b: 15, c: 20 },
          power: 500
        };
        scene.add(gltf.scene);
        models.push(gltf.scene);
      });
      selectObject(0);  // Automatically select the first model
    } catch (error) {
      console.error('Failed to load models', error);
    }
  
    const animate = () => {
      requestAnimationFrame(animate);
      if (selectedObject.value) {
        updatePosition(selectedObject.value, camera, renderer);
      }
      controls.update();
      renderer.render(scene, camera);
    };
  
    animate();
  });
  
  function updatePosition(object, camera, renderer) {
    if (!electricMeterCard.value || !object) return;
  
    const vector = new THREE.Vector3();
    object.updateWorldMatrix(true, false);
    object.getWorldPosition(vector);
    vector.project(camera);
  
    const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
    const y = (vector.y * -0.5 + 0.5) * renderer.domElement.clientHeight;
  
    const cardElement = electricMeterCard.value.$el;
    cardElement.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    cardElement.style.display = 'block';
  }
  
  function selectObject(index) {
    selectedObject.value = models.length > index ? models[index] : null;
  }
  </script>
  
  <style>

  </style>
  