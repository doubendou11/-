<template>
  <v-row no-gutters class="pa-1">
    <!-- 设备列表 -->
    <v-col cols="2">
      <v-row no-gutters>
        <v-col cols="5" class="pa-1">
          <v-card class="left">
            <v-row no-gutters>
              <v-col class="d-flex align-center justify-center text-h6 pa-2" cols="12">
                <!-- <v-icon color="blue-lighten-1" icon="mdi-lightning-bolt-circle" size="28" class="pr-2"></v-icon> -->
                能耗查询
              </v-col>
              <v-col align="center ">
                <v-divider :thickness="2" color="info" class="border-opacity-25 ma-1" />
                <v-list>
                  <v-list-item-group v-model="currentMeterType">
                    <v-list-item v-for="item in electric" :key="item.id" :value="item.type"
                      @click="currentMeterType = item.type">
                      <v-list-item-content>
                        <v-list-item-title>{{ item.type }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="7" class="pa-1">
          <v-card class="mx-auto pa-2">
            <v-row no-gutters>
              <v-col align="center" class="text-h6 pb-4" cols="12">
                楼层导航栏
              </v-col>
              <v-col align="center" class="mb-3">
                <v-chip color="blue-darken-1" label>
                  <v-icon icon="mdi-domain" start></v-icon>
                  木材物流仓库
                </v-chip>
              </v-col>
              <v-col cols="12">
                <el-input v-model="input3" placeholder="请搜索楼层" />
              </v-col>
              <v-col class="pt-3">
                <template v-if="currentMeterType === '电表'">
                  <el-tree :data="data" show-checkbox node-key="id"
                    :default-expanded-keys="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                    :default-checked-keys="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" />
                </template>
                <template v-else-if="currentMeterType === '水表'">
                  <div class="treeStyle">
                    <el-tree :data="waterDevice" node-key="id" render-after-expand @check="handleCheck"
                      @node-click="handleNodeClick" show-checkbox />
                  </div>
                  <!-- <v-treeview :items="waterDevice" @node-click="handleNodeClick" color="blue-darken-1" item-value="id" selectable 
                open-all density="compact"></v-treeview> -->
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-card>
        <v-row no-gutters>
          <v-col class="d-flex align-center justify-center text-h6 pa-2" cols="12">
            <v-icon color="blue-lighten-1" icon="mdi-lightning-bolt-circle" size="28" class="pr-2"></v-icon>
            能耗查询
          </v-col>
          <v-col align="center ">
            <v-divider :thickness="2" color="info" class="border-opacity-25 ma-1" />
            <v-list>
              <v-list-item-group v-model="currentMeterType">
                <v-list-item v-for="item in electric" :key="item.id" :value="item.type"
                  @click="currentMeterType = item.type">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.type }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-card> -->
    </v-col>
    <!-- 区域导航 -->
    <!-- <v-col cols="2" class="pa-1">
      <v-card class="mx-auto pa-2">
        <v-row no-gutters>
          <v-col align="center" class="text-h6 pb-4" cols="12">
            楼层导航栏
          </v-col>
          <v-col align="center" class="mb-2">
            <v-chip color="blue-darken-1" label>
              <v-icon icon="mdi-domain" start></v-icon>
              木材物流仓库
            </v-chip>
          </v-col>
          <v-col cols="12">
            <el-input v-model="input3" placeholder="请搜索楼层" />
          </v-col>
          <v-col class="pt-3">
            <template v-if="currentMeterType === '电表'">
              <el-tree :data="data" show-checkbox node-key="id"
                :default-expanded-keys="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                :default-checked-keys="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" />
            </template>
            <template v-else-if="currentMeterType === '水表'">
              <div class="treeStyle">
                <el-tree :data="waterDevice" node-key="id" render-after-expand @check="handleCheck"
                  @node-click="handleNodeClick" show-checkbox />
              </div> -->
    <!-- <v-treeview :items="waterDevice" @node-click="handleNodeClick" color="blue-darken-1" item-value="id" selectable 
                open-all density="compact"></v-treeview> -->
    <!-- </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col> -->
    <!-- 能耗查询 -->
    <v-col cols="10" class="pa-1">
      <!-- 时间颗粒度 -->
      <v-row>
        <v-col cols="12">
          <v-card class="d-flex">
            <v-col cols="9" class="d-flex">
              <!-- <v-btn-toggle v-model="btn" @change="radioChange" color="primary" density="compact" group divided
                  variant="outlined">
                  <v-btn size="small" label="minute">
                    15分钟
                  </v-btn>
                  <v-btn size="small" label="day">
                    日
                  </v-btn>
                  <v-btn size="small" label="month">
                    月
                  </v-btn>
                </v-btn-toggle> -->
              <!-- <v-col>
                  <span>日</span>
                  <el-date-picker v-model="value2" type="date" placeholder="Pick a day" />
                </v-col>
                <v-col>
                  <span>月</span>
                  <el-date-picker v-model="value5" type="month" placeholder="Pick a month" />
                </v-col>
                <v-col class="d-flex">
                  <span>自定义</span>
                  <el-date-picker v-model="value4" type="datetimerange" start-placeholder="Start date"
                    end-placeholder="End date" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
                    time-format="A hh:mm:ss" />
                </v-col> -->
              <div class="DateBtn">
                <p class="font-weight-regular">
                  时间：
                </p>
                <!-- <el-button v-for="picker in pickerOptions" :key="picker.value"
                  :class="{ 'is-active': currentPicker === picker.value }" type="primary" plain
                  @click="setPicker(picker.value)">
                  {{ picker.label }}
                </el-button> -->
                <el-button v-for="option in granularityOptions" :key="option.value"
                  :class="{ 'is-active': granularity === option.value }" @click="selectGranularity(option.value)"
                  type="primary" plain>
                  {{ option.label }}
                </el-button>
              </div>

              <!-- 年选择器 -->
              <!-- <el-date-picker v-if="currentPicker === 'year'" v-model="selectedYear" type="year" placeholder="选择年份" /> -->

              <!-- 月选择器 -->
              <!-- <el-date-picker v-if="currentPicker === 'month'" v-model="selectedMonth" type="month"
                placeholder="选择月份" /> -->

              <!-- 自定义选择器 -->
              <el-date-picker v-if="granularity === 'custom'" v-model="selectedDaterange" type="datetimerange"
                range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" />
            </v-col>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters class="pt-2">
        <v-col>
          <v-card>
            <!-- 根据当前选择的表类型渲染不同的内容 -->
            <template v-if="currentMeterType === '电表'">
              <div class="content">
                <BasicCard3 content="1986.42kwh" title="总用电量 "></BasicCard3>
                <BasicCard3 content="1986.42kwh" title="最大用电量 "></BasicCard3>
                <BasicCard3 content="1986.42kwh" title="最小用电量 "></BasicCard3>
                <BasicCard3 content="186.42kwh" title="平均用电量"></BasicCard3>
              </div>
            </template>
            <template v-else-if="currentMeterType === '水表'">
              <div class="content">
                <BasicCard3 content="12000t" title="水表总和"></BasicCard3>
                <!-- 其他水表相关内容 -->
              </div>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters class="pt-2">
        <v-col>
          <v-card class="contanier">
            <v-card-title>当前选择</v-card-title>
            <!-- 折线图 -->
            <!-- <StripeChart :chartData="stripeData" /> -->
            <template v-if="currentMeterType === '电表'">
              <div class="granularity-buttons">
                <v-btn v-for="picker in pickerOptions" :key="picker.value"
                  :class="{ 'is-active': currentPicker === picker.label }" variant="outlined"
                  @click="setPicker(picker.label)">
                  {{ picker.label }}
                </v-btn>
                <v-btn variant="outlined" @click="exportPower">导出表格</v-btn>
              </div>
              <!-- <columnChart :chartData="chartData"/> -->
              <template v-if="currentPicker === '折线图'">
                <line-chart :chart-data="chartData" />
              </template>
              <template v-else-if="currentPicker === '柱状图'">
                <BarChart :chart-data="chartData" />
              </template>
              <v-divider :thickness="2" class="border-opacity-25" />
              <v-card-title>电表信息</v-card-title>
              <v-data-table :items="electrictable"></v-data-table>
            </template>
            <template v-else-if="currentMeterType === '水表'">
              <div class="granularity-buttons">
                <v-btn v-for="picker in pickerOptions" :key="picker.value"
                  :class="{ 'is-active': currentPicker === picker.label }" variant="outlined"
                  @click="setPicker(picker.label)">
                  {{ picker.label }}
                </v-btn>
                <v-btn variant="outlined" @click="exportWater">导出表格</v-btn>
              </div>
              <template v-if="currentPicker === '折线图'">
                <line-chart :chart-data="waterData" />
              </template>
              <template v-else-if="currentPicker === '柱状图'">
                <BarChart :chart-data="waterData" />
              </template>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

</template>
<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import BasicCard3 from '@/components/binhui/BasicCard3.vue';
import StripeChart from '@/components/energyAnalyze/StripeChart.vue';
import columnChart from '@/components/energyAnalyze/columnChart.vue';
import { LineChart } from 'vue-chart-3';
import { BarChart } from 'vue-chart-3'; // 引入 BarChart
import axios from 'axios';
import * as XLSX from 'xlsx';
const input3 = ref('');//定义input3
//选择电表信息
const currentMeterType = ref('电表');
const electric = ref([
  { type: '电表', id: 1 },
  { type: '水表', id: 2 },
]);
//选择设备
const items = ref([
  {
    id: 1,
    title: '青白江 :',
    children: [
      {
        id: 2,
        title: '1层 :',
        children: [
          { id: 8, title: '电表1' },
          { id: 9, title: '电表2' },
        ],
      },
      {
        id: 3,
        title: '2层 :',
        children: [
          { id: 12, title: '电表3' },
          { id: 13, title: '电表4' },
        ],
      },
      {
        id: 4,
        title: '3层 :',
        children: [
          { id: 12, title: '电表5' },
          { id: 13, title: '电表6' },
        ],
      },
    ],
  },
]);
// const data = ref([
//   {
//     id: 1,
//     label: '3F',
//     children: [
//       {
//         id: 4,
//         label: '电表1',
//       },
//       {
//         id: 5,
//         label: '电表2',
//       },
//       {
//         id: 6,
//         label: '电表3',
//       },
//     ],
//   },
//   {
//     id: 2,
//     label: '18F',
//     children: [
//       {
//         id: 7,
//         label: '18F-1',
//         children: [
//           {
//             id: 10,
//             label: '电表4',
//           },
//           {
//             id: 11,
//             label: '电表5',
//           },
//         ],
//       },
//       {
//         id: 8,
//         label: '18F-2',
//         children: [
//           {
//             id: 12,
//             label: '电表6',
//           },
//           {
//             id: 13,
//             label: '电表7',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     label: '19F',
//     children: [
//       {
//         id: 9,
//         label: '19F-1',
//         children: [
//           {
//             id: 15,
//             label: '电表8',
//           },
//           {
//             id: 16,
//             label: '电表9',
//           },
//         ],
//       },
//     ],
//   },
// ]);

// 电表设备
const data = ref([
  {
    id: 1,
    label: '全部',
    children: [
      {
        id: 2,
        label: '1层',
        children: [
          {
            id: 10,
            label: '111815',
          },
        ],
      },
      {
        id: 3,
        label: '2层',
        children: [
          {
            id: 11,
            label: '111817',
          },
        ],
      },
      {
        id: 4,
        label: '3层',
        children: [
          {
            id: 12,
            label: '111816',
          },
        ],
      },
      {
        id: 5,
        label: '4层',
        children: [
          {
            id: 13,
            label: '101114',
          },
          {
            id: 14,
            label: '101110',
          },
        ],
      },
      {
        id: 6,
        label: '5层',
        children: [
          {
            id: 15,
            label: '101109',
          },
          {
            id: 16,
            label: '101106',
          },
        ],
      },
      {
        id: 7,
        label: '6层',
        children: [
          {
            id: 17,
            label: '101113',
          },
          {
            id: 18,
            label: '101112',
          },
        ],
      },
      {
        id: 8,
        label: '7层',
        children: [
          {
            id: 19,
            label: '101105',
          },
          {
            id: 20,
            label: '101111',
          },
        ],
      },
      {
        id: 9,
        label: '8层',
        children: [
          {
            id: 21,
            label: '101100',
          },
          {
            id: 22,
            label: '101116',
          },
        ],
      },
    ],
  },
]);

// 根据 floor_name 属性将水表数据进行分组
const waterDevice = ref([]);
// 定义楼层数组
const floorNames = ['1F', '2F', '3F', '4F', '5F', '6F', '7F', '8F', '9F', '10F', '11F', '12F', '13F'];
// 根据楼层名称查询水表数据的函数
const fetchWaterData = async (floorName) => {
  try {
    const response = await axios.get('http://47.122.10.50:3000/api/water-meters', {
      params: {
        floor_name: floorName
      }
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('Failed to fetch water meter data:', error);
    return [];
  }
};

// 格式化水表数据的函数
const formatWaterData = (data) => {
  return data.map(item => ({
    id: item.water_meter_id,
    label: `${item.room_number}`,
    children: [{
      id: item.water_meter_id,
      label: `${item.water_meter_id}`,
    }],
  }));
};

onMounted(async () => {
  for (const floorName of floorNames) {
    const data = await fetchWaterData(floorName);
    const formattedData = formatWaterData(data);

    waterDevice.value.push({
      label: floorName,
      children: formattedData,
    });
  }
});

const stripeData = {
  labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
  datasets: [{
    label: "电流",
    data: [20, 10, 12, 30, 40, 90, 60, 43, 55, 70],
    backgroundColor: '#5698c3',
  },
  {
    label: "电压",
    data: [40, 70, 52, 60, 20, 40, 70, 52, 60, 20],
    backgroundColor: '#0eb0c9',
  },
  {
    label: "用电量",
    data: [100, 45, 78, 50, 80, 70, 50, 60, 45, 80],
    backgroundColor: '#fed71a',
  }
  ]
}
//用水量数据
const waterData = ref({
  labels: [],//横轴标签
  datasets: [
    {
      label: '用水量(吨)',
      borderColor: 'rgb(35, 118, 183)',
      backgroundColor: 'rgba(35, 118, 183, 0.6)',
      data: [],//竖轴标签
      fill: true,
    },
  ],
});

onMounted(() => {
  fetchData();//组件挂载水表接口时调用
  fetchElectricData();//组件挂载电表接口时调用
});

// 图表选择
const currentPicker = ref('折线图'); // 默认选择折线图
const pickerOptions = ref([
  { value: 'line', label: '折线图' },
  { value: 'column', label: '柱状图' },
]);
// 更新当前选择的按钮
const setPicker = (picker) => {
  currentPicker.value = picker;
};
//时间选择
// const pickerOptions = [
//   // { value: 'year', label: '年' },
//   { value: 'month', label: '月' },
//   { value: 'day', label: '自定义' },
// ];
// 颗粒度选择
const granularity = ref('hourly'); // 默认选中的粒度
const granularityOptions = ref([
  { value: 'hourly', label: '小时' },
  { value: 'daily', label: '日' },
  { value: 'weekly', label: '周' },
  { value: 'monthly', label: '月' },
  { value: 'custom', label: '自定义' },
]);

//电表数据
const meterData = ref([]);
const fetchElectricData = async () => {
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
    // {
    //   label: '电压',
    //   data: meterData.value.map((entry) => entry.avg_voltage),//Y轴数据
    //   backgroundColor: 'rgba(97, 154, 195, 0.9)',//柱状图颜色
    // },
    // {
    //   label: '电流',
    //   data: meterData.value.map((entry) => entry.avg_current),//Y轴数据
    //   backgroundColor: 'rgba(178, 207, 135, 0.9)',//柱状图颜色
    // },
    {
      label: '用电量',
      data: meterData.value.map((entry) => entry.avg_power),//Y轴数据
      borderColor: 'rgb(254, 215, 26)',
      backgroundColor: 'rgba(248, 216, 106, 0.5)',//柱状图颜色
      fill: true,
    },
  ],
}));

//自定义事件选择初始值
const selectedDaterange = ref([
  new Date('2023-01-01T00:00:00'),
  new Date('2023-01-07T23:59:59')
]);

//水表数据
const fetchData = async (waterMeterId) => {
  let startTime = ''; // 初始化起始时间
  let endTime = ''; // 初始化结束时间
  const customStartTime = new Date('2023-01-01T00:00:00');
  const customEndTime = new Date('2023-01-07T23:59:59');

  console.log('Selected date range:', selectedDaterange.value);

  if (granularity.value === 'custom') {
    startTime = customStartTime.toISOString();
    endTime = customEndTime.toISOString();

    if (Array.isArray(selectedDaterange.value) && selectedDaterange.value.length === 2) {
      const startDate = selectedDaterange.value[0];
      const endDate = selectedDaterange.value[1];

      // 检查 startDate 和 endDate 是否为有效的 Date 对象
      if (startDate instanceof Date && !isNaN(startDate) && endDate instanceof Date && !isNaN(endDate)) {
        startTime = startDate < customStartTime ? customStartTime.toISOString() : startDate.toISOString();
        endTime = endDate > customEndTime ? customEndTime.toISOString() : endDate.toISOString();
      } else {
        console.error('Selected date range contains invalid dates. Using default start and end time.');
      }
    } else {
      console.error('Selected date range is invalid. Using default start and end time.');
    }
  }
  // 构建请求的 URL，使用传入的水表ID
  const url = `http://47.122.10.50:3000/api/water-meters/consumption?water_meter_id=${waterMeterId}&interval=${granularity.value}&start_time=${startTime}&end_time=${endTime}`;
  try {
    const response = await axios.get(url);

    // 假设返回的数据结构如下：
    // { data: [用水量数据] }
    const consumptionData = response.data.data;

    // 更新 waterData 的 data 值和 labels
    waterData.value.labels = consumptionData.map(item => item.time); // 提取时间作为横轴标签
    waterData.value.datasets[0].data = consumptionData.map(item => parseFloat(item.total_consumption)); // 提取总消费量作为纵轴数据

  } catch (error) {
    console.error('Failed to fetch consumption data:', error);
  }
};
// 用于存储当前选择的水表ID
const selectedWaterMeterId = ref(null);
// 在 el-tree 中添加事件函数 handleNodeClick,处理点击节点事件
// const handleNodeClick = (node) => {
//   if (node.children && node.children.length > 0) {
//     const waterMeterId = node.children[0].id; // 获取第一个子节点的 water_meter_id
//     fetchData(waterMeterId); // 调用 fetchData 方法获取图表数据
//     selectedWaterMeterId.value = waterMeterId; // 将水表ID赋值给 selectedWaterMeterId
//   }
// };
// 处理复选框选择事件
const handleCheck = (data, checked) => {
  if (checked) {
    // 如果复选框被选中，更新图表
    const waterMeterId = data.children[0].id; // 获取第一个子节点的 water_meter_id
    fetchData(waterMeterId); // 调用 fetchData 方法获取图表数据
    selectedWaterMeterId.value = waterMeterId; // 更新选中的水表ID
  }
};
// 更新选中的粒度
const selectGranularity = (value) => {
  granularity.value = value;

  // 检查是否已选择了水表ID
  if (selectedWaterMeterId.value) {
    fetchData(selectedWaterMeterId.value); // 使用已选择的水表ID调用 fetchData 方法
  }
};

// 导出到电表用电量Excel 的函数
const exportPower = () => {
  const worksheet = XLSX.utils.json_to_sheet(meterData.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 导出文件
  XLSX.writeFile(workbook, '用电量数据.xlsx');
};
// 导出水表用水量Excel 的函数
const exportWater = () => {
  // 提取数据
  const dataToExport = waterData.value.labels.map((label, index) => ({
    日期: label,
    用水量: waterData.value.datasets[0].data[index],
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 导出文件
  XLSX.writeFile(workbook, '用水量数据.xlsx');
};
//电表表单
const electrictable = [
  {
    water_meter_id: '1',
    room_id: '1',
    install_date: 'Herbivore',
    m_bus_address: 'Savanna, Forests',
    floor_name: "1F",
    room_number: "1-1",
  },
  // ... more items
]
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  /* 垂直居中 */
}

.v-card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  height: 100%;
  max-height: 100vh;
}

.left {
  height: 100vh;
}

.treeStyle {
  max-height: 80vh;
  overflow: auto;
}

.v-list-item--active {
  background-color: #2b96f3 !important;
  /* 使用您想要的颜色 */
  color: #ffffff;
}

.v-btn--variant-outlined {
  border: thin solid currentColor;
  color: #097edd;
}

.v-btn {
  margin-right: 1rem;
}

.contanier {
  padding-bottom: 9rem;
  max-height: 78vh;
}

.DateBtn {
  display: flex;
  position: relative;
  padding-right: 2rem;
  align-items: center;
}

.is-active {
  background-color: #409eff;
  /* 按钮选中时的背景色 */
  color: white;
  /* 按钮选中时的文字颜色 */
}

.granularity-buttons {
  display: flex;
  position: relative;
  justify-content: right;
  padding-right: 4rem;
}
</style>