<template>
    <v-row>
      <!-- Loop through your air conditioners -->
      <v-col
        v-for="(airConditioner, index) in airConditioners"
        :key="index"
        cols="12" sm="6" md="3" lg="2"
      >
        <v-card class="air-conditioner-card" elevation="2">
          <v-card-title class="justify-space-between">
            {{ airConditioner.name }}
            <v-icon :color="airConditioner.status ? 'success' : 'grey lighten-1'">
              {{ airConditioner.status ? 'mdi-fan' : 'mdi-fan-off' }}
            </v-icon>
          </v-card-title>
          
          <v-card-text>
            <div>室内温度: {{ airConditioner.indoorTemp }}°C</div>
            <div>室内湿度: {{ airConditioner.humidity }}%</div>
            <div>有无人员: {{ airConditioner.person }}</div>
            <div>本月用电量: {{ airConditioner.monthlyEnergy }}KWh</div>
            <div>本年用电量: {{ airConditioner.yearlyEnergy }}KWh</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const airConditioners = ref([
  {
    name: "会议室1",
    status: true,
    indoorTemp: 22,
    humidity: 40,
    person: '有人',
    monthlyEnergy: 150,
    yearlyEnergy: 1800
  },
  {
    name: "会议室2",
    status: false,
    indoorTemp: 25,
    humidity: 35,
    person: '无人',
    monthlyEnergy: 120,
    yearlyEnergy: 1440
  },
  {
    name: "办公室1",
    status: true,
    indoorTemp: 23,
    humidity: 45,
    person: '有人',
    monthlyEnergy: 130,
    yearlyEnergy: 1560
  },
  {
    name: "办公室2",
    status: true,
    indoorTemp: 24,
    humidity: 50,
    person: '无人',
    monthlyEnergy: 140,
    yearlyEnergy: 1680
  }
]);
  </script>
  
  <style scoped>
  .air-conditioner-card {
    /* Adjust card size here if needed, otherwise let it be responsive */
    transition: box-shadow 0.3s;
  }
  
  /* Add other styles if necessary */
  </style>
  