<!-- HomeView.vue -->
<template>
  <v-row class="ma-1">
    <v-col cols="10">
      <v-row align="center">
        <v-col>
          <!-- 加载当前楼层渲染图 -->
          <img v-if="!is3D" :src="currentFloorImage" alt="Floor Plan" class="floor-image" ref="floorImage"
            @load="calculateTooltipPositions" />
          <!-- 天气卡片 -->
          <div class="weather-card">
            <!-- 这里可以放置天气信息 -->
            <!-- <WeaterCard /> -->
          </div>
          <!-- 根据当前楼层加载相应的3D视图 -->
          <component :is="currentLoadModel" v-if="is3D" class="view3D" />
          <!-- 加载wind_icon -->
          <div v-if="airOutlets.length">
            <img v-for="outlet in airOutlets" :key="outlet.id" :src="getWindIcon(outlet.wind_speed)"
              :style="{ top: outlet.iconTop + 'px', left: outlet.iconLeft + 'px' }" />
          </div>
          <!-- 加载室内环境card -->
          <div class="roomstyle"></div>
          <RoomStatusIcon v-for="(room, index) in filteredRooms" :key="index" :roomId="room.roomId"
            :temperature="room.temperature" :humidity="room.humidity" :occupancy="room.occupancy"
            :positionTop="room.positionTop" :positionLeft="room.positionLeft" v-if="!is3D" />
        </v-col>
      </v-row>
      <!-- 楼层筛选器 -->
      <v-row>
        <v-col cols="12" class="pa-0">
          <div class="floor-list" style="display: flex; flex-direction: row; padding: 0; margin: 0;">
            <v-btn v-for="floor in floors" :key="floor.id" :value="floor.id"
              :color="selectedFloor === floor.id ? 'primary' : 'grey'" class="floor-item" @click="selectFloor(floor.id)"
              density="compact">
              {{ floor.name }}
            </v-btn>
            <!-- 3D/2D切换按钮 -->
            <v-row>
              <v-col class="floor_right" justify="end">
                <v-btn class="floor-item" :color="is3D ? 'primary' : 'grey'" @click="toggleView('3D')"
                  density="compact">3D</v-btn>
                <v-btn class="floor-item" :color="!is3D ? 'primary' : 'grey'" @click="toggleView('2D')"
                  density="compact">2D</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row align="end">
        <!-- 电表信息 -->
        <!-- <v-col>
          <BasicCard title="电表信息">
            <template #right>
              <div class="floor-list">
                <div class="granularity-buttons">
                  <v-btn density="comfortable" size="small" v-for="option in granularityOptions" :key="option.value"
                    :value="option.value" :color="granularity === option.value ? 'primary' : 'grey'"
                    @click="selectGranularity(option.value)">
                    {{ option.label }}
                  </v-btn>
                </div>
              </div>
            </template>
<template #content>
              <columnChart :chartData="chartData">
              </columnChart>
            </template>
</BasicCard>
</v-col> -->
      </v-row>
    </v-col>
    <v-col cols="2">
      <!-- 实时天气-->
      <!-- <v-row class="pa-1">
        <v-card variant="tonal" color="primary" class="ma-1 d-flex flex-column" min-width="300">
          <WeaterCard />
        </v-card>
      </v-row> -->
      <!-- 空调面板信息 -->
      <v-row class="pa-1">
        <BasicCard title="当前空调设备状态">
          <template #content>
            <!-- <v-table height="1000px" fixed-header density="compact" class="mt-2"> -->
            <v-table fixed-header density="compact" class="custom-table-padding">
              <thead>
                <tr>
                  <th>
                    房间
                  </th>
                  <th>
                    室内温度
                  </th>
                  <th>
                    设置温度
                  </th>
                  <th>
                    风速
                  </th>
                  <th>
                    开关
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="panel in panels" :key="panel.panel_id" :class="{ 'highlight': panel.is_on === '1' }">
                  <td>{{ getFakePanelName(panel.panel_id) }}</td>
                  <!-- <td>{{ panel.received_at_minute }}</td> -->
                  <td>{{ panel.room_temp }}</td>
                  <td>{{ panel.setting_temp }}</td>
                  <td>{{ panel.wind_speed }}</td>
                  <td :class="{ 'status-on': panel.is_on === '1', 'status-off': panel.is_on === '0' }">
                    {{ panel.is_on === '1' ? '开启' : '关闭' }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </template>
        </BasicCard>
      </v-row>
      <!-- <circuitChart :chartData="testData" color="#3485FF"></circuitChart> -->
      <v-row class="pa-1">
        <BasicCard title="报警信息">
          <template #content>
            <!-- <v-table height="1000px" fixed-header density="compact" class="mt-2"> -->
            <v-table fixed-header density="compact" class="custom-table-padding">
              <thead>
                <tr>
                  <th>
                    序号
                  </th>
                  <th>
                    区域
                  </th>
                  <th>
                    报警内容
                  </th>
                  <th>
                    报警状态
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="alarm in alarms" :key="alarm.alarm_id" :class="{ 'highlight': alarm.alarm_status === '1' }">
                  <td>{{ alarm.alarm_id }}</td>
                  <td>{{ alarm.alarm_area }}</td>
                  <td>{{ alarm.alarm_name }}</td>
                  <td :class="{ 'alarm-on': alarm.alarm_status === '1', 'alarm-off': alarm.alarm_status === '0' }">
                    {{ alarm.alarm_status === '1' ? '已处理' : '未处理' }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </template>
        </BasicCard>
      </v-row>
    </v-col>
  </v-row>
  <!-- <div>
    <p>首页内容</p>
    <AirConditionerDashboard v-if="airConditioners && airConditioners.length" :airConditioners="airConditioners" />
    <div v-else>Loading...</div>
    <p>操作面板</p>
    <AirconditionersPanelControl :id="1"></AirconditionersPanelControl>
    <p>状态面板</p>
    <AirconditionersPanelStatus></AirconditionersPanelStatus>
    <WholeStatus></WholeStatus>   
  <section class="form">
    <CommandForm @submitCommand="submitCommand" />
  </section>

  <section class="history">
    <SubmissionHistory :submissions="submissions" />
  </section>
</div> -->
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import * as echarts from 'echarts';
import AirConditionerDashboard from '@/components/AirConditionerDashboard.vue';
import CommandForm from '@/components/CommandForm.vue';
import SubmissionHistory from '@/components/SubmissionHistory.vue';
import AirconditionersPanelControl from '@/components/airconditonersOperate/PanelControl.vue';
import AirconditionersPanelStatus from '@/components/airconditonersOperate/PanelStatus.vue';
import WholeStatus from '@/components/airconditonersOperate/Whole.vue';
import BasicCard from '@/components/binhui/BasicCard.vue';
import BasicCard3 from '@/components/binhui/BasicCard3.vue';
import circuitChart from '@/components/energyAnalyze/circuitChart.vue';
import columnChart from '@/components/energyAnalyze/columnChart.vue';
import WeaterCard from '@/components/binhui/WeaterCard.vue';
import LoadModel1 from '@/components/3DModel/LoadModel1.vue';
import LoadModel2 from '@/components/3DModel/LoadModel2.vue';
import axios from 'axios';
import RoomStatusIcon from '@/components/binhui/RoomStatusIcon.vue';
onMounted(() => {
  calculateTooltipPositions();
  fetchPanel(); // 组件挂载时调用 fetchpanel
  fetchData();//组件挂载时调用
});
// RoomStatusIcon组件传参
const rooms = ref([
  { roomId: '1807', temperature: '22°C', humidity: '60%', occupancy: '有人', positionTop: 720, positionLeft: 940, floor: 1 },
  { roomId: '1802', temperature: '24°C', humidity: '55%', occupancy: '无人', positionTop: 75, positionLeft: 600, floor: 1 },
  { roomId: '1806', temperature: '22°C', humidity: '60%', occupancy: '有人', positionTop: 720, positionLeft: 1200, floor: 1 },
  { roomId: '1805', temperature: '22°C', humidity: '60%', occupancy: '有人', positionTop: 720, positionLeft: 1450, floor: 1 },
  { roomId: '走廊', temperature: '22°C', humidity: '60%', occupancy: '有人', positionTop: 730, positionLeft: 550, floor: 1 },
  { roomId: '19大会议', temperature: '21°C', humidity: '65%', occupancy: '有人', positionTop: 100, positionLeft: 88, floor: 2 },
  { roomId: '19荣誉室', temperature: '21°C', humidity: '65%', occupancy: '有人', positionTop: 75, positionLeft: 650, floor: 2 },
]);
const filteredRooms = computed(() => {
  return rooms.value.filter(room => room.floor === selectedFloor.value);
});
const panels = ref(null); // 创建响应式数据
const fetchPanel = async () => {
  try {
    const response = await axios.get(
      'https://www.njbinhui.cn/api/all-panels-status'
    );
    // 更新 airOutlets 的状态
    airOutlets.value.forEach(outlet => {
      const panelStatus = response.data.find(panel => panel.panel_id === outlet.id);
      if (panelStatus) {
        outlet.wind_speed = panelStatus.wind_speed; // 直接使用 is_on
      }
    });
    console.log(response.data); // 检查数据结构
    panels.value = response.data; // 直接赋值为数组
  } catch (error) {
    console.error('Error fetching panel data:', error);
  }
};

// 根据 wind_speed 返回对应的图标
const getWindIcon = (windSpeed) => {
  const icons = {
    '0': '/src/assets/icons/wind_status/wind_OFF.png',
    '1': '/src/assets/icons/wind_status/low.gif',
    '2': '/src/assets/icons/wind_status/middle.gif',
    '3': '/src/assets/icons/wind_status/high.gif',
  };
  return icons[windSpeed] || '/src/assets/icons/wind_status/wind_OFF.png'; // 默认图标
};
// 获取面板区域id
const getFakePanelName = (panelId) => {
  const fakeNames = {
    1: '1806-3',
    2: '1806-4',
    3: '1806-1',
    4: '1806-2',
    6: '19荣誉-1',
    8: '19-15',
    9: '1807-2',
    10: '19-13',
    11: '1807-5',
    12: '1807-1',
    13: '19-17',
    14: '19荣誉-2',
    16: '1807-3',
    17: '19-12',
    18: '19-5',
    19: '18走廊',
    21: '1805-3',
    22: '19-9',
    23: '1805-2',
    24: '1802-1',
    25: '19-14',
    26: '19-6',
    27: '19-10',
    28: '19-11',
    29: '19-8',
    30: '19-7',
    31: '19-4',
    32: '1805-1',
    33: '19-1',
    34: '19-2',
    35: '19-3',
    37: '19-16',
    36: '办公室',
    38: '1802-2',
    42: '1807-4',
    45: '',
    46: '办公室1',


    // 可以继续添加其他假数据
  };
  return fakeNames[panelId] || '未知面板'; // 如果没有匹配的假数据，返回默认值
};
//圆形图
// const testData = {
//   labels: ['空调用电', '照明用电', '其他用电'],
//   datasets: [
//     {
//       data: [7000, 4000, 3000],
//       backgroundColor: ['#77CEFF', '#0079AF', '#FFC948'],
//     },
//   ],
// };
//电表数据
const granularity = ref('minute'); // 默认选中的粒度
const granularityOptions = ref([
  { value: 'minute', label: '分钟' },
  { value: 'hour', label: '小时' },
  { value: 'day', label: '日' }
]);
const selectGranularity = (value) => {
  granularity.value = value; // 更新选中的粒度
  fetchData(); // 调用数据获取函数
};
const meterData = ref([]); // Store meter data
const fetchData = async () => {
  try {
    const response = await fetch(
      `https://www.njbinhui.cn/api/meter-data?meterName=Meter_18F&startTime=2024-08-27T00:00:00&endTime=2024-08-27T23:59:59&granularity=${granularity.value}`
    );
    meterData.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch meter data:', error);
  }
};
const chartData = computed(() => ({
  labels: meterData.value.map((entry) => entry.time_group),//X轴标签
  //定义数据结构
  datasets: [
    {
      label: '电压',
      data: meterData.value.map((entry) => entry.avg_voltage),//Y轴数据
      backgroundColor: 'rgba(97, 154, 195, 0.9)',//柱状图颜色
    },
    {
      label: '电流',
      data: meterData.value.map((entry) => entry.avg_current),//Y轴数据
      backgroundColor: 'rgba(178, 207, 135, 0.9)',//柱状图颜色
    },
    {
      label: '用电量',
      data: meterData.value.map((entry) => entry.avg_power),//Y轴数据
      backgroundColor: 'rgba(248, 216, 106, 0.9)',//柱状图颜色
    },
  ],
}));
//柱状图
// const chartData = {
//   labels: ['空调用电', '照明用电', '其他用电'],
//   datasets: [
//     {
//       label: 'Energy Consumption',
//       data: [7000, 4000, 3000],
//       backgroundColor: ['#77CEFF', '#0079AF', '#FFC948'],
//     },
//   ],
// };
//风速图标位置信息
const floors = ref([
  {
    id: 1,
    name: '18F',
    image: '../../../public/image/18.png',
    outlets: [
      { id: 38, markerX: 0.58, markerY: 0.63, iconTop: 0, iconLeft: 0 },
      { id: 24, markerX: 0.63, markerY: 0.63, iconTop: 0, iconLeft: 0 },
      { id: 32, markerX: 1.12, markerY: 1.13, iconTop: 0, iconLeft: 0 },
      { id: 23, markerX: 1.07, markerY: 1.15, iconTop: 0, iconLeft: 0 },
      { id: 21, markerX: 1.12, markerY: 1.00, iconTop: 0, iconLeft: 0 },
      { id: 19, markerX: 0.58, markerY: 1.00, iconTop: 0, iconLeft: 0 },
      { id: 12, markerX: 0.85, markerY: 1.24, iconTop: 0, iconLeft: 0 },
      { id: 9, markerX: 0.75, markerY: 1.24, iconTop: 0, iconLeft: 0 },
      { id: 16, markerX: 0.85, markerY: 1.03, iconTop: 0, iconLeft: 0 },
      { id: 42, markerX: 0.75, markerY: 1.03, iconTop: 0, iconLeft: 0 },
      { id: 11, markerX: 0.65, markerY: 1.03, iconTop: 0, iconLeft: 0 },
      { id: 3, markerX: 0.92, markerY: 1.12, iconTop: 0, iconLeft: 0 },
      { id: 4, markerX: 0.97, markerY: 1.12, iconTop: 0, iconLeft: 0 },
      { id: 1, markerX: 0.92, markerY: 1.98, iconTop: 0, iconLeft: 0 },
      { id: 2, markerX: 0.96, markerY: 1.98, iconTop: 0, iconLeft: 0 },]
  },
  {
    id: 2,
    name: '19F',
    image: '../../../public/image/19.png',
    outlets: [
      { id: 31, markerX: 0.37, markerY: 0.53, iconTop: 0, iconLeft: 0 },
      { id: 34, markerX: 0.42, markerY: 0.53, iconTop: 0, iconLeft: 0 },
      { id: 35, markerX: 0.47, markerY: 0.53, iconTop: 0, iconLeft: 0 },
      { id: 8, markerX: 0.52, markerY: 0.53, iconTop: 0, iconLeft: 0 },
      { id: 33, markerX: 0.30, markerY: 0.64, iconTop: 0, iconLeft: 0 },
      { id: 13, markerX: 0.52, markerY: 0.68, iconTop: 0, iconLeft: 0 },
      { id: 26, markerX: 0.29, markerY: 0.81, iconTop: 0, iconLeft: 0 },
      { id: 30, markerX: 0.29, markerY: 0.97, iconTop: 0, iconLeft: 0 },
      { id: 29, markerX: 0.33, markerY: 1.05, iconTop: 0, iconLeft: 0 },
      { id: 22, markerX: 0.45, markerY: 1.05, iconTop: 0, iconLeft: 0 },
      { id: 27, markerX: 0.52, markerY: 1.05, iconTop: 0, iconLeft: 0 },
      { id: 37, markerX: 0.52, markerY: 0.86, iconTop: 0, iconLeft: 0 },
      { id: 18, markerX: 0.48, markerY: 1.2, iconTop: 0, iconLeft: 0 },
      { id: 25, markerX: 0.60, markerY: 1.05, iconTop: 0, iconLeft: 0 },
      { id: 28, markerX: 0.60, markerY: 0.91, iconTop: 0, iconLeft: 0 },
      { id: 10, markerX: 0.66, markerY: 1.05, iconTop: 0, iconLeft: 0 },
      { id: 17, markerX: 0.66, markerY: 0.91, iconTop: 0, iconLeft: 0 },
    ]
  },
]);
//鸿宇楼层list
const is3D = ref(false); // 默认显示2D视图
const selectedFloor = ref(floors.value[0].id); // 默认选中第一个楼层
const currentFloorImage = ref(floors.value[0].image); // 默认显示第一个楼层的图片
const airOutlets = ref([]); // 定义风口信息
const floorImage = ref();//定义2d楼层图片

const selectFloor = (floorId) => {
  selectedFloor.value = floorId; // 更新选中的楼层
  updateFloorImage(); // 更新楼层图片和风口信息
  fetchPanel(); // 获取新楼层的风速图标状态
};
const modelsMap = {
  1: LoadModel1, // 18F
  2: LoadModel2, // 19F
  // 可以继续添加其他楼层的模型
};

const currentLoadModel = computed(() => modelsMap[selectedFloor.value] || LoadModel2);

const toggleView = (view) => {
  is3D.value = view === '3D'; // 根据点击的按钮切换视图
  if (is3D.value) {
    airOutlets.value = []; // 切换到3D模式时清空风口信息
  } else {
    updateFloorImage(); // 切换回2D模式时更新楼层信息
  }
};
const updateFloorImage = () => {
  const floor = floors.value.find(f => f.id === selectedFloor.value);
  if (floor) {
    currentFloorImage.value = floor.image; // 更新当前楼层的图片
    airOutlets.value = floor.outlets.map(outlet => ({ ...outlet })); // 更新风口信息
    console.log('Updated airOutlets:', airOutlets.value); // 调试信息
    calculateTooltipPositions(); // 计算风口位置
  }
};

const calculateTooltipPositions = () => {
  if (!floorImage.value) return;

  // 获取楼层图片的尺寸
  const imageWidth = floorImage.value.clientWidth;
  const imageHeight = floorImage.value.clientHeight;
  // Calculate the absolute positions for each room tooltip based on relative marker positions
  airOutlets.value.forEach(outlet => {
    outlet.iconLeft = outlet.markerX * imageWidth;
    outlet.iconTop = outlet.markerY * imageHeight;
  });
  console.log('Calculated positions:', airOutlets.value); // 调试信息
};
// Recalculate positions on mounted or image load
onMounted(() => {
  calculateTooltipPositions();
  updateFloorImage(); // 初始化时更新
});
//报警假数据
const alarms = ref([
  {
    alarm_id: '1',
    alarm_area: '1802',
    alarm_name: '无人，空调开启',
    alarm_status: '1',
  },
  {
    alarm_id: '2',
    alarm_area: '1807',
    alarm_name: '无人，空调开启',
    alarm_status: '0',
  },
  {
    alarm_id: '3',
    alarm_area: '1806',
    alarm_name: '有人，室内温度>26°',
    alarm_status: '0',
  },
])
//当天区域能耗排行
// const desserts = [
//   {
//     id: '1',
//     region: '25楼会议室',
//     energy: '200',
//   },
//   {
//     id: '2',
//     region: '25楼会议室',
//     energy: '200',
//   },
//   {
//     id: '3',
//     region: '25楼会议室',
//     energy: '200',
//   },
//   {
//     id: '4',
//     region: '25楼会议室',
//     energy: '200',
//   }
// ]
//当天空调能耗table字段


// const airConditioners = ref([]);
// const submissions = ref([]);

// const fetchAirConditioners = async () => {
//   try {
//     const response = await fetch('http://localhost:8080/airconditioners');
//     if (response.ok) {
//       const data = await response.json();
//       airConditioners.value = data;
//       console.log(data);
//       console.log("调用的数据",airConditioners.value)
//     } else {
//       console.error('Failed to fetch air conditioners:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error fetching air conditioners:', error);
//   }
// };

// const fetchSubmissions = async () => {
//   // Fetch submission history data from the backend
//   // Update submissions ref
// };

// const submitCommand = async (command) => {
//   // Submit command to the backend
//   // Update airConditioners or submissions ref accordingly
// };

// // Fetch air conditioners data when the component is mounted
// onMounted(async () => {
//   await fetchAirConditioners();
// });
// // fetchAirConditioners();
// fetchSubmissions();
</script>

<style scoped>
.floor-image {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.weather-card {
  background-color: rgba(255, 255, 255, 0.8);
  /* 半透明白色背景 */
  border-radius: 8px;
  /* 圆角 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  /* 阴影效果 */
  position: absolute;
  top: 8%;
  left: 0.5%;
  max-width: 213px;
}

.room-tooltip {
  position: relative;
  /* Adjust based on the room size */
}

img {
  width: 32px;
  height: auto;
  position: absolute;
}

.roomstyle {
  position: absolute;
  top: 10px;
  left: 10px;
}

.floor-list {
  display: flex;
}

.floor_right {
  display: flex;

}

.floor-item {
  margin-right: 16px;
  cursor: pointer;
  /* 鼠标悬停时显示为可点击 */
}

.view3D {
  width: 100%;
  height: 500px;
}

.floor-item:last-child {
  margin-right: 0;
  /* 最后一个楼层项不需要右边距 */
}

.granularity-buttons {
  display: flex;
  gap: 8px;
}

.v-table {
  border-collapse: collapse;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  /* 确保表格宽度为100% */
}

.v-table>.v-table__wrapper>table>tbody>tr>td {
  padding: 0px 8px
}

.v-table>.v-table__wrapper>table>thead>tr>th {
  padding: 0px 8px
}

td {
  cursor: pointer;
  color: rgb(136, 135, 135);
  font-size: 12px;
  white-space: nowrap;
  /* 防止换行 */
}

th {
  background-color: #BFE0FF !important;
  color: #2F78BC;
}

tr:hover {
  background-color: #cbdaf7;
}

.status-on,
.alarm-on {
  color: rgb(0, 132, 255);
  font-weight: bold;
}

.highlight {
  background-color: rgba(247, 211, 92, 0.2);
}
</style>
