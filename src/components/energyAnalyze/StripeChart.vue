<template>
    <div class="chart">
        <LineChart :chartData="chartData" />
    </div>
</template>

<script setup>
import { LineChart } from 'vue-chart-3';
import { defineProps } from 'vue';
const props = defineProps({
    chartData: {
        type: Object,
        default: [],
        required: true,
    },
})

</script>
<style scoped>
.chart {
    height: 80%;
}
</style>