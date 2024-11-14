<template>
  <v-container fluid>
    <v-row no-gutters align="center">
      <v-col cols="1">
        <v-card class="mx-auto" max-width="300" color="#3485FF">
          <v-card-title>楼层</v-card-title>
          <v-list :items="items" item-title="region" item-value="id" lines="two" color="primary">
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
        <h1>三维场景</h1>
      </v-col>
      <v-col cols="2">
        <v-row class="pt-1 justify-center">
          <v-btn-toggle color="primary" rounded="lg" density="comfortable" group divided variant="text" elevation="2">
            <v-btn>
              设备统计
            </v-btn>
            <v-btn>
              设备列表
            </v-btn>
          </v-btn-toggle>
        </v-row>
        <v-row class="pt-3 align-center">
          <span>区域</span>
          <v-select :items="selectregion" density="compact" label="区域" class="pl-5" variant="solo"
            color="primary"></v-select>
        </v-row>
        <v-row>
          <BasicCard title="空调控制器">
            <template #content>
              <AirconditionersPanelControl :id="1"></AirconditionersPanelControl>
            </template>
          </BasicCard>
        </v-row>
        <v-row class="pt-2">
          <BasicCard title="设备信息">
            <template #content>
              <v-row>
                <v-col>
                  <h5>所在楼层</h5>
                  <h5>设备状态</h5>
                  <h5>风速</h5>
                  <h5>室内温度</h5>
                </v-col>
                <v-col>
                  <h5>所在楼层</h5>
                  <h5>设备状态</h5>
                  <h5>风速</h5>
                  <h5>室内温度</h5>
                </v-col>
              </v-row>
            </template>
          </BasicCard>
        </v-row>
        <v-row class="pt-2">
          <BasicCard title="报警记录">
            <template #content>
              <BaseTable :tableData="alarmData" />
            </template>
          </BasicCard>
        </v-row>
      </v-col>
    </v-row>
    <v-row>

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
import { ref, onMounted, reactive } from 'vue';
import FilterMenu from '@/components/FilterMenu.vue';
import FilterDevices from '@/components/DevicesFilter.vue';
import circuitChart from '@/components/energyAnalyze/circuitChart.vue'
import BasicCard from '@/components/binhui/BasicCard.vue'
import ElectricMeterCard from '@/components/binhui/ElectricMeterCard.vue';
import columnChart from '@/components/energyAnalyze/columnChart.vue';
import AirconditionersPanelControl from '@/components/airconditonersOperate/PanelControl.vue';
import { LineChart } from 'vue-chart-3';

// Register the components used in the chart
// Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
const items = ref(
  [
    {
      region: '25楼空调',
      id: 1,
    },
    {
      region: '24楼空调',
      id: 2,
    },
    {
      region: '23楼空调',
      id: 3,
    },
  ]
)
//报警记录table字段
const alarmData = reactive([
  { alarm_event: '11', handle_person: 'john', alarm_starttime: '1' },
  { alarm_event: '11', handle_person: 'jane', alarm_starttime: '1' },
])
const selectregion = ref(
  ['25楼办公室1', '25楼办公室2']
)
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
h5 {
  margin-top: 8px;
  color: rgb(121, 120, 120)
}
</style>
