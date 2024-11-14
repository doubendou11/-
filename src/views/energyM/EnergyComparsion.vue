<template>
    <v-container fluid>
        <v-row class="layout-border row-border">
            <v-col cols="12">
                <v-card class="d-flex">
                    <v-col cols="4">
                        <h3>能耗环比分析</h3>
                    </v-col>
                    <v-col cols="8" class="d-flex">
                        <div class="DateBtn">
                            <p class="font-weight-regular">
                                日期：
                            </p>
                            <el-button-group type="primary">
                                <el-button @click="currentPicker = 'year'">年</el-button>
                                <el-button @click="currentPicker = 'month'">月</el-button>
                                <el-button @click="currentPicker = 'day'">日</el-button>
                            </el-button-group>
                        </div>
                        <!-- 年选择器 -->
                        <el-date-picker v-if="currentPicker === 'year'" v-model="selectedYear" type="year"
                            placeholder="选择年份"></el-date-picker>

                        <!-- 月选择器 -->
                        <el-date-picker v-if="currentPicker === 'month'" v-model="selectedMonth" type="month"
                            placeholder="选择月份"></el-date-picker>

                        <!-- 日选择器 -->
                        <el-date-picker v-if="currentPicker === 'day'" v-model="selectedDaterange" type="daterange"
                            range-separator="To" start-placeholder="Start date" end-placeholder="End date"
                            placeholder="选择日期"></el-date-picker>
                    </v-col>
                </v-card>
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-card class="mt-2">
                            <v-card-title>Energy Data Trends</v-card-title>
                            <v-card-text>
                                <line-chart :chart-data="chartData" />
                                <v-table fixed-header density="compact" class="custom-table-padding">
                                    <thead>
                                        <tr>
                                            <th>
                                                区域
                                            </th>
                                            <th>
                                                设备
                                            </th>
                                            <th>
                                                本月用电
                                            </th>
                                            <th>
                                                上月用电
                                            </th>
                                            <th>
                                                增加值
                                            </th>
                                            <th>
                                                环比(%)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="energy in energys" :key="energy.device">
                                            <td>{{ energy.building_area }}</td>
                                            <td>{{ energy.device }}</td>
                                            <td>{{ energy.energy_thismonth }}</td>
                                            <td>{{ energy.energy_lastmonth }}</td>
                                            <td>{{ energy.energy_up }}</td>
                                            <td>{{ energy.energy_percentage }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import FilterMenu from '@/components/FilterMenu.vue';
import FilterDevices from '@/components/DevicesFilter.vue';
import circuitChart from '@/components/energyAnalyze/circuitChart.vue'
import BasicCard from '@/components/binhui/BasicCard.vue'
import ElectricMeterCard from '@/components/binhui/ElectricMeterCard.vue';
import { LineChart } from 'vue-chart-3';

// Register the components used in the chart
// Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
const currentPicker = ref('year'); // 当前选择的类型
const selectedYear = ref(null); // 选择的年
const selectedMonth = ref(null); // 选择的月
const selectedDaterange = ref(null); // 选择的日期
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
//能耗环比假数据
const energys = ref([
    {
        building_area: "1802",
        device: "电表1",
        energy_thismonth: "12111kwh",
        energy_lastmonth: "12000kwh",
        energy_up: "111kwh",
        energy_percentage: "5%",
    },
    {
        building_area: "1802",
        device: "电表1",
        energy_thismonth: "12111kwh",
        energy_lastmonth: "12000kwh",
        energy_up: "111kwh",
        energy_percentage: "5%",
    },
    {
        building_area: "1802",
        device: "电表1",
        energy_thismonth: "12111kwh",
        energy_lastmonth: "12000kwh",
        energy_up: "111kwh",
        energy_percentage: "5%",
    },
    {
        building_area: "1802",
        device: "电表1",
        energy_thismonth: "12111kwh",
        energy_lastmonth: "12000kwh",
        energy_up: "111kwh",
        energy_percentage: "5%",
    },
    {
        building_area: "1802",
        device: "电表1",
        energy_thismonth: "12111kwh",
        energy_lastmonth: "12000kwh",
        energy_up: "111kwh",
        energy_percentage: "5%",
    },
    {
        building_area: "1802",
        device: "电表1",
        energy_thismonth: "12111kwh",
        energy_lastmonth: "12000kwh",
        energy_up: "111kwh",
        energy_percentage: "5%",
    },
    {
        building_area: "1802",
        device: "电表1",
        energy_thismonth: "12111kwh",
        energy_lastmonth: "12000kwh",
        energy_up: "111kwh",
        energy_percentage: "5%",
    },
    {
        building_area: "1802",
        device: "电表1",
        energy_thismonth: "12111kwh",
        energy_lastmonth: "12000kwh",
        energy_up: "111kwh",
        energy_percentage: "5%",
    },
])
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

.v-col {
    align-items: center;
}

.v-row {
    align-items: center;
}

.DateBtn {
    display: flex;
    position: relative;
    padding-right: 30px;
    padding-left: 30%;
    align-items: center;
}

.v-table {
    border-collapse: collapse;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    /* 确保表格宽度为100% */
    padding-top: 0.5%;
    position: relative;
    display: flex;
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
    border-right: 1px solid #f0eded;
}

th {
    background-color: #BFE0FF !important;
    color: #2F78BC;
    font-size: 15px;
    border-right: 1px solid #f0eded;
}

tr:hover {
    background-color: #e1edf5;
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