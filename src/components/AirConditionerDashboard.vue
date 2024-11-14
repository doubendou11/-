<template>
    <div class="air-conditioner-dashboard">
      <h2>Air Conditioner Dashboard</h2>
      <div v-for="ac in airConditioners" :key="ac.AC_ID" class="ac-card">
        <h3>{{ ac.Brand }} {{ ac.Model }}</h3>
        <p>Status: {{ ac.Status }}</p>
        <p>Location: {{ ac.Location }}</p>
        <p>Installation Date: {{ ac.Installation_Date }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      airConditioners: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .air-conditioner-dashboard {
    padding: 20px;
  }
  
  .ac-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .ac-card h3 {
    margin-top: 0;
  }
  </style>
  