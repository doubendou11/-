<template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="selectedDevice"
            :items="measureAreas"
            item-text="measure_area"
            item-value="id"
            label="Select device by area"
            persistent-hint
            return-object
            clearable
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="searchQuery"
            label="Search by Meter ID or Area"
            outlined
            clearable
            @input="filterDevices"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedDevice = ref(null);
  const searchQuery = ref("");
  const allDevices = ref([
    // Assuming this data would normally be fetched from an API
    { id: 1, measure_area: '6色彩印机', meter_id: 2, electric_cabinet: '1号' },
    { id: 2, measure_area: '500线控后段', meter_id: 3, electric_cabinet: '1号' },
    // Add more devices as per your actual data
  ]);
  const devices = ref([...allDevices.value]);

  const measureAreas = ref(allDevices.value.map(device => device.measure_area));
  
  const filterDevices = () => {
    if (!searchQuery.value) {
      devices.value = [...allDevices.value];
    } else {
      devices.value = allDevices.value.filter(device =>
        device.measure_area.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        device.meter_id.toString() === searchQuery.value
      );
    }
  };
  </script>
  