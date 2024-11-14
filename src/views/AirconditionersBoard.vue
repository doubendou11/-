<template>
  <v-container fluid>
    <v-row class="layout-border">

      <!-- Left part: Single Column with full height -->
      <v-col cols="12" md="3" class="left-column">
        <!-- Your left column content here -->
        <h3>楼层分布</h3>

        <BasicCard :title="cardTitle" :content="cardContent" />

        <FilterMenu></FilterMenu>
        <FilterDevices></FilterDevices>

        <ElectricMeterCard meterId="12" deviceName="拉伸机" :currents="currents" :power="power" />
      </v-col>

      <!-- Right part: Multiple Rows -->
      <v-col cols="12" md="9" class="right-column">
        <v-row class="row-border">
          <v-col cols="4" class="column-border">
            <!-- Content for right top row -->
            <h3>用能统计</h3>
            <CircleChart :chart-data="circleData">圆形图</CircleChart>
          </v-col>
          <v-col cols="8" class="column-border">
            <!-- Content for right top row -->
            <BasicCard :title="cardTitle" :content="cardContent" :footer="cardFooter" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- Content for right middle row -->
            <h3>test</h3>
            <p>
              Texting also offers a degree of emotional distance that can be preferable in certain
              situations. Written communication allows for a thoughtful and composed response, reducing
              the chances of being caught off guard or saying something impulsively. This is especially
              beneficial for delicate or sensitive discussions where precision in communication is
              essential.

            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- Content for right bottom row -->
            <h3>test</h3>
            <!-- 显示数据趋势 -->
            <v-card class="ma-4">
              <v-card-title>Energy Data Trends</v-card-title>
              <v-card-text>
                <line-chart :chart-data="chartData" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FilterMenu from '@/components/FilterMenu.vue';
import FilterDevices from '@/components/DevicesFilter.vue';
import circuitChart from '@/components/energyAnalyze/circuitChart.vue'
import BasicCard from '@/components/binhui/BasicCard.vue'
import ElectricMeterCard from '@/components/binhui/ElectricMeterCard.vue';

import { LineChart } from 'vue-chart-3';

// Register the components used in the chart
// Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Average Voltage (Volts)',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      data: [],
      fill: true,
    },
    {
      label: 'Average Power (Watts)',
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      data: [],
      fill: true,
    },
    {
      label: 'Sum Energy (kWh)',
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      data: [],
      fill: true,
    }
  ]
});

const circleData = ref({
  labels: ['空调', '照明', '其他'],
  datasets: [
    {
      data: [7000, 4000, 3000],
      backgroundColor: ['#77CEFF', '#0079AF', 'rgba(75, 192, 192, 0.5)'],
      borderColor: ['#fff'], // White borders
      borderWidth: 2
    },
  ],

})

//测试BASIC CARD
const cardTitle = ref('Device Status');
const cardContent = ref('Operating Normally');
const cardFooter = ref('Last update: 3 mins ago');
// 测试 电表card
const currents = ref({
  a: 20,
  b: 20,
  c: 24
});

const power = ref(380); // in kW

const fetchData = async () => {
  try {
    const response = await fetch('https://www.njbinhui.cn/api/metrics/aggregate?startDate=2024-04-23%2000:00:00&endDate=2024-04-25%2000:00:00&interval=hour');
    const data = await response.json();
    processChartData(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const processChartData = (data) => {
  chartData.value.labels = data.map(item => item.interval_start);
  chartData.value.datasets[0].data = data.map(item => item.avg_vol_a);
  chartData.value.datasets[1].data = data.map(item => item.avg_power_total);
  chartData.value.datasets[2].data = data.map(item => item.sum_energy);
};

onMounted(() => {
  fetchData();
});



</script>

<style>
.layout-border {
  border: 1px solid #e0e0e0;
  /* Light grey border for overall layout */
}

.left-column {
  border-right: 2px solid #e0e0e0;
  /* Light grey border */
  padding-right: 1rem;
  /* Padding to keep content away from the border */
}

.right-column {
  box-shadow: -5px 0 10px -5px rgba(0, 0, 0, 0.2);
  /* Subtle shadow for depth */
  padding-left: 1rem;
  /* Padding to keep content away from the shadow */
}


.row-border {
  border-bottom: 1px solid #e0e0e0;
  /* Light grey border between rows */
}

.column-border {
  border-right: 1px solid #e0e0e0;
  /* Light grey border between columns */
}

/* Responsive adjustments */
@media (max-width: 959px) {

  /* Adjust breakpoint as needed */
  .left-column {
    border-right: none;
    /* Remove border on smaller screens */
    border-bottom: 2px solid #e0e0e0;
    /* Add border to the bottom */
    padding-right: 0;
    /* Reset padding */
  }

  .right-column {
    box-shadow: none;
    /* Remove shadow on smaller screens */
    padding-left: 0;
    /* Reset padding */
  }
}
</style>
