<template>
    <div class="card">
        <div class="card-header">
            <h3 class="device-name">{{ deviceName }}</h3>
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