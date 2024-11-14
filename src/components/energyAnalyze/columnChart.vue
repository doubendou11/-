<template>
    <div class="BarChart">
        <BarChart :chartData="chartData" />
    </div>
</template>
<script setup>
import { BarChart } from 'vue-chart-3';
import { defineProps } from 'vue';
const props = defineProps({
    chartData: {
        type: Object,
        default: () => ({
            responsive: true,
            maintainAspectRatio: false, // 允许
            layout: {
                padding: {
                    top: 0, // 调整顶部的填充
                    bottom: 0, // 调整底部的填充
                    left: 0, // 调整左侧的填充
                    right: 0, // 调整右侧的填充
                },
            },
            plugins: {
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Energy Consumption Overview',
                },
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxRotation: 0,
                        minRotation: 0,
                    },
                    grid: {
                        display: false,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10, // 设置每个刻度的间隔
                        padding: 10, // 调整刻度的 padding
                    },
                    grid: {
                        color: '#e0e0e0',
                    },
                },

            },
        }),//默认值应为对象而不是数组
        required: true,
    },

})
</script>
<style scoped>
.BarChart {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>