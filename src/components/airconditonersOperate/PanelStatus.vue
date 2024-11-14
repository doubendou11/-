<!-- <template>
    <v-card class="air-conditioner-panel">
      <v-card-title class="text-h5 text-center">
        空调设备1
        <v-btn icon class="status-btn">
          <v-icon>{{ airConditioner.status ? 'mdi-power' : 'mdi-power-off' }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-img class="air-conditioner-img" src="src/assets/image/run.png" />
   
  
      <v-card-text>
        <div class="temperature-display">
          <div>
            室内温度
            <span>{{ airConditioner.indoorTemp }}°C</span>
          </div>
          <div>
            室内湿度
            <span>{{ airConditioner.humidity }}%</span>
          </div>
          <div>
            有无人员
            <span>{{ airConditioner.person }}</span>
          </div>
        </div>
  
        <div class="energy-consumption">
          <div>
            本月
            <span>{{ airConditioner.monthlyEnergy }}KWh</span>
          </div>
          <div>
            本年
            <span>{{ airConditioner.yearlyEnergy }}KWh</span>
          </div>
        </div>
      </v-card-text>
  
      <v-card-actions>
  
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const airConditioner = ref({
    status: true, // true for on, false for off
    indoorTemp: 26,
    humidity: 19,
    person:'无人',
    monthlyEnergy: 234,
    yearlyEnergy: 300
  });
  </script>
  
  <style scoped>
  .air-conditioner-panel {
    max-width: 300px;
    margin: auto;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .status-btn {
    float: right;
    color: green;
  }
  
  .air-conditioner-img {
    /* Set your image properties */
    margin: 20px auto;
  }
  
  .temperature-display,
  .energy-consumption {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  
 
  </style>
   -->
  <!-- <template>
    <v-card class="air-conditioner-card" elevation="2">
      <v-card-title>
        会议室1
        <v-btn text small class="details-button">详情</v-btn>
      </v-card-title>
  
      <v-img height="70" class="air-conditioner-image" src="src/assets/image/off.jpg" ></v-img>
  
      <v-card-text>
        <v-row>
          <v-col cols="6" class="status-item">
            <span class="status-value">开启</span>
            <span class="status-label">空调状态</span>
          </v-col>
          <v-col cols="6" class="status-item">
            <span class="status-value">26℃</span>
            <span class="status-label">设定温度</span>
          </v-col>
          <v-col cols="6" class="status-item">
            <span class="status-value">19℃</span>
            <span class="status-label">室内温度</span>
          </v-col>
          <v-col cols="6" class="status-item">
            <span class="status-value">有人</span>
            <span class="status-label">有无人员</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="energy-consumption">
            <div class="consumption-value">234KWh</div>
            <div class="consumption-label">本周用电量</div>
            <div class="consumption-value">300KWh</div>
            <div class="consumption-label">上周用电量</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'AirConditionerCard'
    // Component Logic
  };
  </script>
  
  <style scoped>
  .air-conditioner-card {
    max-width: 320px;
    border-radius: 5px;
    text-align: center;
  }
  
  .details-button {
    float: right;
    font-size: 14px;
  }
  
  .air-conditioner-image {
    margin-top: 1rem;
  }
  
  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #0FA1FF;
    font-family: 'Microsoft YaHei';
  }
  
  .status-value {
    font-size: 15px;
    font-weight: 400;
  }
  
  .status-label {
    font-size: 8px;
    color: #707070;
  }
  
  .energy-consumption {
    background-color: #EBF4FD;
    border-radius: 4px;
    padding: 8px;
    text-align: center;
  }
  
  .consumption-value {
    color: #0FA1FF;
    font-size: 15px;
  }
  
  .consumption-label {
    font-size: 8px;
    color: #707070;
  }
  </style>
   -->


   <!-- <template>
    <v-card class="air-conditioner-card" elevation="2">
      <v-card-title>
        空调设备1
        <v-btn icon class="status-btn">
          <v-icon>{{ airConditioner.status ? 'mdi-power' : 'mdi-power-off' }}</v-icon>
        </v-btn>
      </v-card-title>
  
      <v-img 
    :height="airConditioner.status ? '70' : '60'" 
    class="air-conditioner-image" 
    :src="airConditioner.status ? '/image/run.png' : '/image/off.png'"
  />
    
  
      <v-card-text>
        <v-row>
          <v-col cols="6" class="status-item">
            <span class="status-value">{{ airConditioner.status ? '开启' : '关闭' }}</span>
            <span class="status-label">空调状态</span>
          </v-col>
          <v-col cols="6" class="status-item">
            <span class="status-value">{{ airConditioner.indoorTemp }}℃</span>
            <span class="status-label">设定温度</span>
          </v-col>
          <v-col cols="6" class="status-item">
            <span class="status-value">{{ airConditioner.humidity }}%</span>
            <span class="status-label">室内湿度</span>
          </v-col>
          <v-col cols="6" class="status-item">
            <span class="status-value">{{ airConditioner.person }}</span>
            <span class="status-label">有无人员</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="energy-consumption">
            <div class="consumption-value">{{ airConditioner.monthlyEnergy }}KWh</div>
            <div class="consumption-label">本月用电量</div>
            <div class="consumption-value">{{ airConditioner.yearlyEnergy }}KWh</div>
            <div class="consumption-label">本年用电量</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <DoughnutChart :chart-data="testData" />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { DoughnutChart } from 'vue-chart-3';
 

  const airConditioner = ref({
    status: false, // true for on, false for off
    indoorTemp: 26,
    humidity: 19,
    person: '有人',
    monthlyEnergy: 234,
    yearlyEnergy: 300
  });

  // testData remains the same
const testData = ref({
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    }
  ]
});




  </script>
  
  <style scoped>
  .air-conditioner-card {
    max-width: 320px;
    border-radius: 5px;
    text-align: center;
  }
  
  .status-btn {
    float: right;
    color: green;
  }
  
  .air-conditioner-image {
    margin-top: 1rem;
  }
  
  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #0FA1FF;
    font-family: 'Microsoft YaHei';
  }
  
  .status-value {
    font-size: 15px;
    font-weight: 400;
  }
  
  .status-label {
    font-size: 8px;
    color: #707070;
  }
  
  .energy-consumption {
    background-color: #EBF4FD;
    border-radius: 4px;
    padding: 8px;
    text-align: center;
  }
  
  .consumption-value {
    color: #0FA1FF;
    font-size: 15px;
  }
  
  .consumption-label {
    font-size: 8px;
    color: #707070;
  }
  </style> -->
  

  <template>
    <v-card class="air-conditioner-card" elevation="12">
      <v-card-title class="justify-space-between">
        <div>
          <v-icon large left>mdi-air-conditioner</v-icon>
          空调设备1
        </div>
        <v-btn icon :color="airConditioner.status ? 'green' : 'grey'">
          <v-icon>{{ airConditioner.status ? 'mdi-power' : 'mdi-power-off' }}</v-icon>
        </v-btn>
      </v-card-title>
    
      <v-img
        :height="airConditioner.status ? '150' : '150'"
        aspect-ratio="1.5"
        class="air-conditioner-image"
        :src="airConditioner.status ? '/image/run.png' : '/image/off.png'"
      />
    
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" v-for="item in statusItems" :key="item.label">
              <v-chip class="ma-2" :color="item.color" dark>
                {{ item.label }}: {{ item.value }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <LineChart :chart-data="runtimeData" />
            </v-col>
            <v-col cols="12" md="6">
              <LineChart :chart-data="energyData" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-table
        height="300px"
        fixed-header
        class="elevation-1"
      >
        <thead>
          <tr>
            <th class="text-left" v-for="item in statusItems" :key="item.label+'header'">
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="item in statusItems" :key="item.label+'value'">
              {{ item.value }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { LineChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  const airConditioner = ref({
    status: true, // true for on, false for off
    indoorTemp: 26,
    humidity: 19,
    person: '有人',
    monthlyEnergy: 234,
    yearlyEnergy: 300
  });
  
  const statusItems = [
    { label: '空调状态', value: airConditioner.value.status ? '开启' : '关闭', color: 'blue' },
    { label: '设定温度', value: `${airConditioner.value.indoorTemp}℃`, color: 'amber' },
    { label: '室内湿度', value: `${airConditioner.value.humidity}%`, color: 'green' },
    { label: '有无人员', value: airConditioner.value.person, color: 'purple' },
  ];
  
  const runtimeData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Runtime (Hours)',
      data: [50, 60, 70, 80, 90],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
      fill: true,
      tension: 0.4
    }]
  };
  
  const energyData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Energy (kWh)',
      data: [234, 220, 210, 232, 240],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1,
      fill: true,
      tension: 0.4
    }]
  };
  </script>
  
  <style scoped>
  .air-conditioner-card {
    max-width: 600px;
    margin: auto;
  }
  
  .air-conditioner-image {
    margin-top: 1rem;
  }
  </style>
  