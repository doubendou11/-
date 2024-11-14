<template>
    <div class="status">
      <h2>Air Conditioner Status</h2>
      <div v-if="statuses.length > 0" class="status-list">
        <div v-for="status in statuses" :key="status.AC_ID" class="status-item">
          <h3>Air Conditioner {{ status.AC_ID }}</h3>
          <p>Power Status: {{ status.Power_Status }}</p>
          <p>Temperature: {{ status.Temperature }}</p>
          <p>Mode: {{ status.Mode }}</p>
          <p>Fan Speed: {{ status.Fan_Speed }}</p>
        </div>
      </div>
      <div v-else>
        <p>No air conditioner statuses available</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      statuses: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style>
  .status {
    margin-top: 20px;
  }
  
  .status-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .status-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 200px;
  }
  </style>
  