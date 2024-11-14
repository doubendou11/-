<template>
    <div class="card">
      <div class="card-image">
        <img :src="imageSrc" alt="Card Image">
      </div>
      <div class="card-body">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-content">{{ content }}</p>
      </div>
      <div class="card-footer">{{ footer }}</div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    title: String,
    content: String,
    footer: String,
    imageSrc: String,
  });
  </script>
  
  <style scoped>
  .card {
      width: 300px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      margin: 10px;
  }
  .card-image img {
      width: 100%;
      display: block;
  }
  .card-body {
      padding: 20px;
      background: #fff;
  }
  .card-footer {
      background: #f8f8f8;
      padding: 10px;
      text-align: center;
      color: #777;
  }
  </style>
  