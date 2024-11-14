<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2" class="left-column">
        <h3>系统列表</h3>
        <FilterMenu :filters="filters" :items="items"></FilterMenu>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="3">
            <BasicCard1 title="基本信息">
              <template #content>
                <h4>设备状态</h4>
                <h4>开机时间</h4>
                <h4>今日运行</h4>
                <h4>累计运行时间</h4>
              </template>
            </BasicCard1>
          </v-col>
          <v-col cols="3">
            <BasicCard1 title="能耗统计">
              <template #content>
                <h4>日耗电量</h4>
                <h4>周耗电量</h4>
                <h4>本月耗电量</h4>
                <h4>全年用电</h4>
              </template>
            </BasicCard1>
          </v-col>
          <v-col cols="3">
            <BasicCard1 title="设备诊断">
              <template #content>
                <h4>设备当前运行状态正常</h4>
              </template>
            </BasicCard1>
          </v-col>
          <v-col cols="3">
            <BasicCard1 title="环境数据">
              <template #content>
                <h4>室外温度</h4>
                <h4>室外湿度</h4>
                <h4>外风机状态</h4>
                <h4>压缩机状态</h4>
              </template>
            </BasicCard1>
          </v-col>
        </v-row>
        <v-row>
          <!-- 设备概览 -->
          <v-col cols="12">
            <BasicCard2 title="设备概览">
              <template #title>
                <v-btn density="comfortable" size="large" variant="text" color="primary">
                  设备工况
                </v-btn>
                <v-btn density="comfortable" size="large" variant="text" color="primary">
                  设备功耗
                </v-btn>
                <v-btn density="comfortable" size="large" variant="text" color="primary">
                  实时参数
                </v-btn>
                <v-btn density="comfortable" size="large" variant="text" color="primary">
                  冷机参数
                </v-btn>
                <v-btn density="comfortable" size="large" variant="text" color="primary">
                  用能报表
                </v-btn>
              </template>
              <template #left>
                <img src="/src/assets/air/3.png" style="width: 99%; height: auto" />
              </template>
              <template #right>
                <BasicCard3 title="能效比(COP)" :content="water.cop"></BasicCard3>
                <BasicCard3 title="制冷量(KW)" :content="water.cool"></BasicCard3>
                <BasicCard3 title="实时功率(KW)" :content="water.power"></BasicCard3>
                <BasicCard3 title="负载率(%)" :content="water.load"></BasicCard3>
                <BasicCard3 title="冷冻水温度(℃)" :content="water.temp"></BasicCard3>
              </template>
            </BasicCard2>
          </v-col>
        </v-row>
      </v-col>


    </v-row>
    <!-- <v-row  class="layout-border">

      <v-col cols="12" md="3" class="left-column">
        <h3>楼层分布</h3>
        <BasicCard1></BasicCard1>
        <FilterMenu></FilterMenu>
      </v-col>

      <v-col cols="12" md="9" class="right-column">
        <v-row class="row-border">
          <v-col cols="4" class="column-border">
            <h3>用能统计</h3>
            <p>
              Texting also offers a degree of emotional distance that can be preferable in certain situations.
              Written communication allows for a thoughtful and composed response, reducing the chances of being
              caught off guard or saying something impulsively. This is especially beneficial for delicate or
              sensitive discussions where precision in communication is essential
            </p>
          </v-col>
          <v-col cols="8" class="column-border">
            <h3>异常情况</h3>
            <p>
              Texting also offers a degree of emotional distance that can be preferable in certain situations.
              Written communication allows for a thoughtful and composed response, reducing the chances of being
              caught off guard or saying something impulsively. This is especially beneficial for delicate or
              sensitive discussions where precision in communication is essential
            </p>
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

              Moreover, texting is less intrusive than phone calls. I can engage in multiple conversations
              simultaneously without the need for immediate responses, allowing me to multitask and
              maintain focus on other activities. This flexibility suits my lifestyle and enables me to
              stay connected without feeling overwhelmed by constant interruptions.

              In summary, my preference for texting stems from its convenience, asynchronous nature,
              ability to keep records, emotional distance, and reduced intrusiveness. These factors
              collectively make texting a practical and efficient means of communication that aligns with
              my communication style and daily routine.

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
import { LineChart } from 'vue-chart-3';
import BasicCard1 from '@/components/binhui/BasicCard1.vue';
import BasicCard from '@/components/binhui/BasicCard.vue';
import BasicCard2 from '@/components/binhui/BasicCard2.vue';
import BasicCard3 from '@/components/binhui/BasicCard3.vue';
import { all } from 'axios';
import { reactive } from 'vue';
// Register the components used in the chart
// Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
// 水冷机组列表
const filters = ref([
  'All', '风冷机组1', '风冷机组2',
])
const items = ref([
  { text: '风冷机组1', category: '风冷机组1' },
  { text: '风冷机组2', category: '风冷机组2' },
]);
// 设备工况数据
const water = reactive(
  {
    cop: "5.55",
    cool: "966.75",
    power: "175.30",
    load: "59.3",
    temp: "7.1",
  }
);
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

// const fetchData = async () => {
//   try {
//     const response = await fetch('https://www.njbinhui.cn/api/metrics/aggregate?startDate=2024-04-23%2000:00:00&endDate=2024-04-25%2000:00:00&interval=hour');
//     const data = await response.json();
//     processChartData(data);
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//   }
// };

// const processChartData = (data) => {
//   chartData.value.labels = data.map(item => item.interval_start);
//   chartData.value.datasets[0].data = data.map(item => item.avg_vol_a);
//   chartData.value.datasets[1].data = data.map(item => item.avg_power_total);
//   chartData.value.datasets[2].data = data.map(item => item.sum_energy);
// };

// onMounted(() => {
//   fetchData();
// });



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
  height: 100vh;
}

.right-column {
  box-shadow: -5px 0 10px -5px rgba(0, 0, 0, 0.2);
  /* Subtle shadow for depth */
  padding-left: 1rem;
  /* Padding to keep content away from the shadow */
}

h4{
  padding: 3%;
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

  .right-column {
    box-shadow: none;
    /* Remove shadow on smaller screens */
    padding-left: 0;
    /* Reset padding */
  }
}
</style>
