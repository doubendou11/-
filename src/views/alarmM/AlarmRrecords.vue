<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12" class="pt-1">
                <BasicCard5 title="所属系统">
                    <template #right>
                        <div class="DateBtn">
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
                    </template>
                </BasicCard5>
            </v-col>
            <v-col cols="12" class="pt-1">
                <v-card class="d-flex pa-1  justify-space-around">
                    <BasicCard6 title="新增报警" number="0">
                        <template #circle>
                            <div class="circle">
                            </div>
                        </template>
                    </BasicCard6>
                    <BasicCard6 title="一般报警" number="0">
                        <template #circle>
                            <div class="circle1">
                            </div>
                        </template>
                    </BasicCard6>
                    <BasicCard6 title="警告报警" number="0">
                        <template #circle>
                            <div class="circle2">
                            </div>
                        </template>
                    </BasicCard6>
                    <BasicCard6 title="严重报警" number="0">
                        <template #circle>
                            <div class="circle3">
                            </div>
                        </template>
                    </BasicCard6>
                    <BasicCard6 title="已处理报警" number="0">
                        <template #circle>
                            <div class="circle4">
                            </div>
                        </template>
                    </BasicCard6>
                </v-card>
            </v-col>
            <v-col cols="12" class="pt-1">
                <BasicCard5 title="所属系统">
                    <template #content>
                        <div style="padding-bottom: 100px;">
                            <div style="padding-bottom: 100px;">
                                <line-chart :chart-data="chartData"></line-chart>
                            </div>
                        </div>
                    </template>
                </BasicCard5>
            </v-col>
            <v-col cols="12" class="pt-1">
                <BasicCard5 title="详细数据分析">
                    <template #content>
                        <v-table fixed-header density="compact" class="custom-table-padding">
                            <thead>
                                <tr>
                                    <th>
                                        序号
                                    </th>
                                    <th>
                                        日期
                                    </th>
                                    <th>
                                        区域
                                    </th>
                                    <th>
                                        设备名称
                                    </th>
                                    <th>
                                        报警内容
                                    </th>
                                    <th>
                                        新增报警
                                    </th>
                                    <th>
                                        一般报警
                                    </th>
                                    <th>
                                        警告报警
                                    </th>
                                    <th>
                                        严重报警
                                    </th>
                                    <th>
                                        已处理报警
                                    </th>
                                    <th>
                                        待处理报警
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="alarm in alarms" :key="alarm.alarm_id">
                                    <td>{{ alarm.alarm_id }}</td>
                                    <td>{{ alarm.alarm_date }}</td>
                                    <td>{{ alarm.alarm_area }}</td>
                                    <td>{{ alarm.alarm_device }}</td>
                                    <td>{{ alarm.alarm_name }}</td>
                                    <td>{{ alarm.alarm_new }}</td>
                                    <td>{{ alarm.alarm_normal }}</td>
                                    <td>{{ alarm.alarm_warn }}</td>
                                    <td>{{ alarm.alarm_serious }}</td>
                                    <td>{{ alarm.alarm_processed }}</td>
                                    <td>{{ alarm.alarm_untreated }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </template>
                </BasicCard5>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import BasicCard from '@/components/binhui/BasicCard.vue';
import StripeChart from '@/components/energyAnalyze/StripeChart.vue';
import columnChart from '@/components/energyAnalyze/columnChart.vue';
import BasicCard5 from '@/components/binhui/BasicCard5.vue';
import BasicCard6 from '@/components/binhui/BasicCard6.vue';
import { LineChart } from 'vue-chart-3';
//折线图
const chartData = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    datasets: [{
        label: "报警",
        data: [2, 1, 1, 3, 4, 9, 6, 4, 5, 7],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
    },
    ]
}
//详细数据分析
const alarms = ref([
    {
        alarm_id: '1',
        alarm_date: '2024-9-26',
        alarm_area: '1806',
        alarm_device: '1806-1',
        alarm_name: '无人，空调开启',
        alarm_new: '1',
        alarm_normal: '1',
        alarm_warn: '1',
        alarm_serious: '1',
        alarm_processed: '1',
        alarm_untreated: '1',
    },
    {
        alarm_id: '1',
        alarm_date: '2024-9-26',
        alarm_area: '1806',
        alarm_device: '1806-1',
        alarm_name: '无人，空调开启',
        alarm_new: '1',
        alarm_normal: '1',
        alarm_warn: '1',
        alarm_serious: '1',
        alarm_processed: '1',
        alarm_untreated: '1',
    },
    {
        alarm_id: '1',
        alarm_date: '2024-9-26',
        alarm_area: '1806',
        alarm_device: '1806-1',
        alarm_name: '无人，空调开启',
        alarm_new: '1',
        alarm_normal: '1',
        alarm_warn: '1',
        alarm_serious: '1',
        alarm_processed: '1',
        alarm_untreated: '1',
    },
])
const currentPicker = ref('year'); // 当前选择的类型
const selectedYear = ref(null); // 选择的年
const selectedMonth = ref(null); // 选择的月
const selectedDaterange = ref(null); // 选择的日期
</script>
<style scoped>
.DateBtn {
    display: flex;
    position: relative;
    padding-right: 60px;
}

.circle {
    width: 18px;
    height: 18px;
    background: rgb(148, 13, 171, 1);
    border-radius: 50%;
}

.circle1 {
    width: 18px;
    height: 18px;
    background: #FEBE16;
    border-radius: 50%;
}

.circle2 {
    width: 18px;
    height: 18px;
    background: #16FEE2;
    border-radius: 50%;
}

.circle3 {
    width: 18px;
    height: 18px;
    background: #FE1616;
    border-radius: 50%;
}

.circle4 {
    width: 18px;
    height: 18px;
    background: #426FE3;
    border-radius: 50%;
}

.v-table {
    border-collapse: collapse;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    /* 确保表格宽度为100% */
    padding-top: 0.5%;
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
    font-size: 15px;
}

tr:hover {
    background-color: #f7edcb;
}
</style>