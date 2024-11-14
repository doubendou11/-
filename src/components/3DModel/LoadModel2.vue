<template>
  <div ref="container">
    <ElectricMeterCard v-for="model in models" :key="model.userData.meterId" :meterId="model.userData.meterId"
      :deviceName="model.userData.deviceName" :currents="model.userData.currents" :power="model.userData.power"
      :style="model.userData.style" />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import ElectricMeterCard from '@/components/binhui/ElectricMeterCard.vue';

const container = ref(null);
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const models = reactive([]);
//const cardPositions = reactive({}); // Store card positions for overlap checks


/*
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
    const modelData = [
      // Example model data with URLs and metadata
      { url: '/model/lgc_combine/330suojingji/55.gltf', meterId: '001', deviceName: 'Model 1', currents: { a: 10, b: 15, c: 20 }, power: 100 },
      { url: '/model/lgc_combine/330chongbeiji/51.gltf', meterId: '002', deviceName: 'Model 2', currents: { a: 20, b: 25, c: 30 }, power: 200 },
      // Add more models
    ];

    await Promise.all(modelData.map(async (item) => {
      const gltf = await loader.loadAsync(item.url);
      gltf.scene.userData = item;  // Bind data to the model
      scene.add(gltf.scene);
      models.push(gltf.scene);  // Add model to reactive array
      updatePosition(gltf.scene, camera, renderer);  // Position the card initially
    }));
  } catch (error) {
    console.error('Failed to load models', error);
  }

  const animate = () => {
    requestAnimationFrame(animate);
    models.forEach(model => updatePosition(model, camera, renderer));  // Update position for all models
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
});

function updatePosition(model, camera, renderer) {
  if (!model) return;

  const vector = new THREE.Vector3();
  model.updateWorldMatrix(true, false);
  model.getWorldPosition(vector);
  vector.project(camera);

  const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
  const y = (vector.y * -0.5 + 0.5) * renderer.domElement.clientHeight;

  // Update the styling directly in the model's userData for reactivity
  model.userData.style = {
    position: 'absolute',
    transform: `translate(-50%, -50%) translate(${x}px,${y}px)`,
    display: 'block'
  };
}
*/

//改用BOX方法去绑定模型位置
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


  const modelData = [
    // Example model data with URLs and metadata
    // { url: '/model/lgc_combine/330suojingji/55.gltf', meterId: '055', deviceName: '330suojingji', currents: { a: 10, b: 15, c: 20 }, power: 100 },
    //   { url: '/model/lgc_combine/500suojingji/56.gltf', meterId: '055', deviceName: '500suojingji', currents: { a: 10, b: 15, c: 20 }, power: 100 },
    //   { url: '/model/lgc_combine/330chongbeiji/51.gltf', meterId: '051', deviceName: '330chongbeiji', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/500chongbeiji/14.gltf', meterId: '014', deviceName: '500chongbeiji', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/500kaijuanji/9.gltf', meterId: '009', deviceName: '500kaijuanji', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/500lashengji1/47.gltf'},
    //   { url: '/model/lgc_combine/500lashengji2/48.gltf'},
    //   { url: '/model/lgc_combine/500lashengji4/10.gltf', meterId: '010', deviceName: '500lashengji2', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/500lashengji5/69.gltf', meterId: '069', deviceName: '500lashengji2', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/500lashengji6/67.gltf', meterId: '067', deviceName: '500lashengji2', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/500lashengji7/68.gltf', meterId: '068', deviceName: '500lashengji2',},
    //   { url: '/model/lgc_combine/500lashengji8/49.gltf', meterId: '049', deviceName: '500lashengji2', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/caiyingji/52.gltf', meterId: '048', deviceName: '500lashengji2', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/factory/factory.gltf', meterId: '048', deviceName: '500lashengji2', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/500qingxiji/65.gltf', meterId: '048', deviceName: '500lashengji2', currents: { a: 20, b: 25, c: 30 }, power: 200 },
    //   { url: '/model/lgc_combine/neituhongxiang/54.gltf', meterId: '055', deviceName: '330suojingji', currents: { a: 10, b: 15, c: 20 }, power: 100 },
    //   { url: '/model/lgc_combine/weiqiang/weiqiang.gltf', meterId: '055', deviceName: '330suojingji', currents: { a: 10, b: 15, c: 20 }, power: 100 },
    { url: '/model/hongyu/19/19.gltf' },
    { url: '/model/hongyu/Light/light.gltf' },
    // Add more models
  ];

  await Promise.all(modelData.map(async (item) => {
    const gltf = await loader.loadAsync(item.url);
    gltf.scene.userData = item;  // Bind data to the model
    scene.add(gltf.scene);
    models.push(gltf.scene);  // Add model to reactive array
    updatePosition(gltf.scene, camera, renderer);  // Position the card initially
  }));

  const animate = () => {
    requestAnimationFrame(animate);
    models.forEach(model => updatePosition(model, camera, renderer));  // Update position for all models
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
});

function updatePosition(model, camera, renderer) {
  if (!model) return;

  const box = new THREE.Box3().setFromObject(model);
  const center = new THREE.Vector3();
  box.getCenter(center);
  center.applyMatrix4(model.matrixWorld);
  center.project(camera);

  const x = (center.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
  const y = (center.y * -0.5 + 0.5) * renderer.domElement.clientHeight;


  // Update the styling directly in the model's userData for reactivity
  model.userData.style = {
    position: 'absolute',
    transform: `translate(-50%, -50%) translate(${x}px,${y - 80}px)`,
    display: 'block',
  };


}


</script>

<style scoped>
/* Styles can go here */
</style>
