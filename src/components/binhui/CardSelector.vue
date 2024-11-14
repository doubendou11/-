<template>
    <div>
      <select v-model="selectedCard">
        <option value="BasicCard">Basic Card</option>
        <option value="ImageHeaderCard">Image Header Card</option>
      </select>
      
      <component :is="selectedCard"
                 :title="title" 
                 :content="content" 
                 :footer="footer" 
                 :imageSrc="imageSrc" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BasicCard from './BasicCard.vue'
  import ImageHeaderCard from './ImageHeaderCard.vue'
  
  const selectedCard = ref('BasicCard');
  const title = ref('Card Title');
  const content = ref('Card content goes here...');
  const footer = ref('Footer text');
  const imageSrc = ref('path_to_image.jpg');
  </script>
  