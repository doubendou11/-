<template>
        <DoughnutChart class="container" :chartData="chartData" :options="chartOptions"/>
</template>

<script setup>
import { DoughnutChart } from 'vue-chart-3';
import { ref,defineProps } from 'vue';
const props = defineProps({
    chartData: {
        type: Object,
        default: [],
        required: true,
    },
})

const chartOptions = ref({
    plugins: {
        legend: {
            position: 'left', // Positions the legend on the left side of the chart
            labels: {
                padding: 5,
                boxWidth: 20,
                color: '#333', // Adjust the label colors if needed
            }
        },
        tooltip: {
            enabled: true
        }
    },
    responsive: true, // Ensures the chart is responsive
    maintainAspectRatio: false, // Can adjust based on your layout needs
});

</script>
<style scoped>
.container{
    height: 150px;
}
</style>