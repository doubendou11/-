<template>
    <!-- <v-row class="ma-2">
        <v-col cols="12">
            <span>elment组件根据字段获取</span>
            <runningBind :tableData="alarmData" /> -->
            <LoadModel1 style="height: 700px;"></LoadModel1>
        <!-- </v-col>
        <v-cols cols="12">
            <span>根据数据库自动获取表头电表数据</span>
            <BaseTable :tableData="alarmData"></BaseTable>
        </v-cols>
    </v-row> -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import ThreeModel from '@/components/ThreeModel.vue';
import ThreeModelNew from '@/components/ThreeModelNew.vue';
import ThreeModelM from '@/components/ThreeModelM.vue';
import LoadModel1 from '@/components/3DModel/LoadModel1.vue';
import BaseTable from '@/components/binhui/BaseTable.vue';
import runningBind from '@/components/binhui/runningBind.vue'
import axios from 'axios'
//组件挂载后，可以访问这个DOM属性
onMounted(() => {
    getAlarmList()
})
//假数据测试
// const alarmData = reactive([
//   { time_group: '', avg_voltage: '', avg_current: '1' ,avg_power:'',activeEnergy:''},
// ])
const alarmData = ref();
//获取电表信息
const getAlarmList = () => {
    axios({
        method: "get",
        url: "https://www.njbinhui.cn/api/meter-data?meterName=Meter_18F&startTime=2024-08-26T13:00:00&endTime=2024-08-27T14:00:00&granularity=hour",
    })
        .then(res => {
            console.log("电表:", res.data.data);
            alarmData.value = res.data.data;
        })
}
</script>