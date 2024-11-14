<!-- <template>
    <div class="card">
        <div class="card-header">
            <h2 class="device-name">{{ deviceName }}</h2>
            <p class="meter-id">Meter ID: {{ meterId }}</p>
        </div>
        <div class="card-container">
            <h3 class="title">电流</h3>
            <ul class="list">
                <li>{{ currents.a }} A</li>
                <li>{{ currents.b }} A</li>
                <li>{{ currents.c }} A</li>
            </ul>
            <h3 class="title" style="padding-bottom: 10px;">功率</h3>
            <p class="power">{{ power }} kW</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  meterId: String,
  deviceName: String,
  currents: {
    type: Object,
    default: () => ({ a: 0, b: 0, c: 0 })
  },
  power: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped lang="scss">
.card {
    position: relative;
    border-radius: 5px;
    background-color: #ffffff;
    border: 3px solid #5E6166;
    box-shadow: 1px 4px 4px 0 rgba(0, 0, 0, 0.25);
    color: #FFF;
    max-width: 250px;
    margin: 20px;
}

.card-header {
    background-color: #1A4798;
    padding: 10px 16px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.device-name {
    font-size: 18px;
    margin: 0;
}

.meter-id {
    font-size: 12px;
    color: #DDD;
    margin-top: 5px;
}

.card-container {
    background-color: #1a588a;
    padding: 16px;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.title {
    color: #FFF;
    font-family: 'Microsoft YaHei';
    font-size: 16px;
    margin: 10px 0 5px;
}

.list {
    list-style: none;
    padding: 0;
    margin: 0 0 10px;
    font-family: 'Microsoft YaHei';
    font-weight: bold;
    display: flex;
    justify-content: space-around;
}

.power {
    font-size: 16px;
    text-align: center;
    padding: 5px 0;
}
</style> -->

<template>
    <div class="card">
        <div class="card-header">
            <h3 class="device-name">{{ deviceName }}</h3>
            <p class="meter-id">ID: {{ meterId }}</p>
        </div>
        <div class="card-container">
            <div class="measurements">
                <div><span>电流</span></div>
                <span>A:</span><strong>{{ currents.a }} A</strong>
                <span>B:</span><strong>{{ currents.b }} A</strong>
                <span>C:</span><strong>{{ currents.c }} A</strong>
            </div>
            <div class="power">
                <span>功率:</span><strong>{{ power }} kW</strong></div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  meterId: String,
  deviceName: String,
  currents: {
    type: Object,
    default: () => ({ a: 0, b: 0, c: 0 })
  },
  power: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.card {
    position: relative;
    border-radius: 5px;
    background-color: #ffffff;
    border: 2px solid #424242;
    color: #000000;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    width: 100px; /* Maintain small size for multiple display */
    margin: 10px;
    overflow: hidden; /* Ensures nothing hangs out of the card */
    opacity: 0.7;
}

.card-header {
    background-color: #1A4798;
    color: #FFF;
    padding: 5px 8px;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease; /* Smooth transition for the header */
}

.card:hover .card-header {
    height: auto; /* Expand the header on hover */
    padding: 5px 8px; /* Reapply padding when expanded */
}

.device-name {
    margin: 0;
    font-weight: bold;
    font-size: 12px; /* Smaller font size for device name */
}

.meter-id {
    margin: 0;
    font-size: 10px; /* Smaller ID font size for consistency */
}

.card-container {
    padding: 1px;
    background-color: #c5d4f3; /* Lighter shade of grey instead of black */
}

.measurements {
    font-size: 10px;

}

.measurements div span {
    color: #0c0c0c;
}

.power {
    font-size: 10px;
    text-align: center;
    color: #141414;
}

.measurements strong, .power strong {
    color: #033681;
}
</style>

<!-- <style scoped>
.card {
    position: relative;
    border-radius: 5px;
    background-color: #ffffff;
    border: 2px solid #5E6166;
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.1);
    color: #333;
    width: 100px; /* Maintain small size for multiple display */
    margin: 10px;
}

.card-header {
    background-color: #1A4798;
    color: #FFF;
    padding: 5px 8px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.device-name {
    margin: 0;
    font-weight: bold;
    font-size: 12px; /* Smaller font size for device name */
}

.meter-id {
    margin: 0;
    font-size: 10px; /* Smaller ID font size for consistency */
}

.card-container {
    padding: 8px;
    background-color: #596f9b; /* Lighter shade of grey instead of black */
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.measurements {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    margin-bottom: 4px;
}

.measurements div span {
    color: #bbb;
}

.power {
    font-size: 10px;
    text-align: center;
}

.measurements strong, .power strong {
    color: #FFF;
}
</style> -->

<!-- <template>
    <div class="card" @mouseover="showDetails = true" @mouseleave="showDetails = false">
      <div class="card-header">
        <h3 class="device-name">{{ deviceName }}</h3>
        <p class="meter-id">ID: {{ meterId }}</p>
      </div>
      <div class="card-container" v-show="showDetails">
        <div class="measurements">
          <div><span>电流 A:</span><strong>{{ currents.a }} A</strong></div>
          <div><span>B:</span><strong>{{ currents.b }} A</strong></div>
          <div><span>C:</span><strong>{{ currents.c }} A</strong></div>
        </div>
        <div class="power">
          <span>功率:</span><strong>{{ power }} kW</strong>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  
  const props = defineProps({
    meterId: String,
    deviceName: String,
    currents: {
      type: Object,
      default: () => ({ a: 0, b: 0, c: 0 })
    },
    power: {
      type: Number,
      default: 0
    }
  });
  
  const showDetails = ref(false);
  </script>
  
  <style scoped>
  .card {
      position: relative;
      border-radius: 5px;
      background-color: #ffffff;
      border: 2px solid #5E6166;
      box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.1);
      color: #333;
      width: 150px; /* Maintain small size for multiple display */
      margin: 10px;
      transition: all 0.3s ease;
  }
  
  .card:hover {
      box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .card-header {
      background-color: #1A4798;
      color: #FFF;
      padding: 5px 8px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
  }
  
  .device-name, .meter-id {
      margin: 0;
      font-weight: bold;
      font-size: 12px;
  }
  
  .card-container {
      padding: 8px;
      background-color: #596f9b;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      display: none;
  }
  
  .measurements, .power {
      font-size: 10px;
      color: #FFF;
  }
  
  .measurements div span {
      color: #bbb;
  }
  </style> -->
  