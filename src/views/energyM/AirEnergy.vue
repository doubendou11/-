<template>
    <v-container fluid>
      <v-row >
        <v-col cols="1" class="left-column">
          <h3>会议室</h3>
          <img src="/src/assets/icons/air_status/air-open.png" style="width: 100%;" />
          <h4>空调状态:</h4>
          <h4>设定温度:</h4>
          <h4>空调状态:</h4>
          <h4>有无人员:</h4>
          <h4>运行计划:</h4>
          <h4></h4>
        </v-col>
        <v-col cols="11">
          <v-row>
            <v-col cols="3">
  
              <BasicCard title="报警情况">
                <template #content>
                  <h4>今日用电</h4>
                  <h4>本月用电</h4>
                  <h4>今年用电</h4>
                </template>
              </BasicCard>
            </v-col>
            <v-col>
              <BasicCard title="报警情况">
                <template #content>
                </template>
              </BasicCard>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <!-- 用电量 -->
            <v-col cols="12">
              <BasicCard title="用电量">
                <template #content>
                  <!-- 柱状图 -->
                  <columnChart :chartData="columnData" />
                </template>
              </BasicCard>
            </v-col>
            <!-- 运行时间 -->
            <v-col cols="12">
              <BasicCard title="运行时间">
                <template #content>
                  <!-- 柱状图 -->
                  <columnChart :chartData="columnData" />
                </template>
              </BasicCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- <v-row class="layout-border">
        <v-col cols="12" md="3" class="left-column">
          <h3>系统列表</h3>
          <FilterMenu></FilterMenu>
          <FilterDevices></FilterDevices>
  
  
        </v-col>
  
        <v-col cols="12" md="9" class="right-column">
          <v-row class="row-border">
            <v-col cols="4" class="column-border">
  
              <h3>用能统计</h3>
              <CircleChart :chart-data="circleData">圆形图</CircleChart>
            </v-col>
            <v-col cols="8" class="column-border">
  
              <BasicCard :title="cardTitle" :content="cardContent" :footer="cardFooter" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
  
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
              <h3>test</h3>
              <v-card class="ma-4">
                <v-card-title>Energy Data Trends</v-card-title>
                <v-card-text>
                  <line-chart :chart-data="chartData" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
  
      </v-row> -->
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import FilterMenu from '@/components/FilterMenu.vue';
  import FilterDevices from '@/components/DevicesFilter.vue';
  import circuitChart from '@/components/energyAnalyze/circuitChart.vue'
  import BasicCard from '@/components/binhui/BasicCard.vue'
  import ElectricMeterCard from '@/components/binhui/ElectricMeterCard.vue';
  import columnChart from '@/components/energyAnalyze/columnChart.vue';
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
  //用电量柱状图
  const columnData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    datasets: [{
      label: "月份",
      data: [40, 20, 12, 30, 40],
      backgroundColor: '#123E6B'
    },
    ]
  }
  //测试BASIC CARD
  const cardTitle = ref('Device Status');
  
  
  
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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* Light grey border for overall layout */
  }
  
  .left-column {
    border-right: 2px solid #c0bfbf;
    /* Light grey border */
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 100vh;
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
  