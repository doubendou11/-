<template>
    <v-container fluid>
        <v-row>
            <!-- 运行策略表单 -->
            <v-col cols="12">
                <v-card>
                    <v-banner lines="one">
                        <v-toolbar-title>运行策略</v-toolbar-title>
                        <template v-slot:actions>
                            <v-btn color="primary" variant="flat" @click="addRule">
                                +创建运行规则
                            </v-btn>
                        </template>
                    </v-banner>
                    <BaseTable :tableData="runningRules" :headers="['序列', '规则名称', '设置模式', '设置温度', '风速', '备注']" />
                </v-card>
            </v-col>
            <!-- 绑定运行计划 -->
            <v-col cols="12">
                <v-card>
                    <v-banner lines="one">
                        <v-toolbar-title>运行计划</v-toolbar-title>
                        <template v-slot:actions>
                            <v-btn color="primary" variant="flat" @click="addTime">
                                +绑定运行计划
                            </v-btn>
                        </template>
                    </v-banner>
                    <BasetableEdit :tableData="selectTime"
                        :headers="['区域', '选择规则', '开始时间', '结束时间', '是否为工作日', '开始日期', '结束日期',]" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <!-- 这个部分用来设置空调运行策略 -->
    <div class="boxShadow" v-if="showRlueDialog">
        <div class="boxShadow_Runningrule">
            <BasicCard title="创建运行规则">
                <template #content>
                    <BaseInput v-model="runningRules.strategy_name" label="规则名称" type="text" />
                    <BaseSelect :options="modes" v-model="runningRules.setting_mode" label="运行模式" />
                    <BaseInput v-model="runningRules.temperature_threshold" label="设定温度" type="number" min="16"
                        max="32" />
                    <BaseSelect :options="Windspeed" v-model="runningRules.fan_speed" label="设定风速" />
                    <BaseInput v-model="runningRules.remark" label="规则备注" type="text" />
                </template>
                <template #footer>
                    <v-btn color="primary" variant="flat" @click="confirmRule">绑定</v-btn>
                    <v-btn variant="tonal" @click="showRlueDialog = false">取消</v-btn>
                </template>
            </BasicCard>
        </div>
    </div>
    <!-- 这个部分用来绑定运行策略的运行计划 -->
    <div class="boxShadow" v-if="showTimeDialog">
        <div class="boxShadow_Selectime">
            <BasicCard title="绑定运行计划">
                <template #content>
                    <div style="margin: 10px;">
                        <el-form-item label="运行区域">
                            <el-tree-select v-model="selectTime.region" :data="data" multiple
                                :render-after-expand="false" show-checkbox check-strictly check-on-click-node
                                style="width: 92% " />
                        </el-form-item>
                        <BaseSelect v-model="selectTime.rule" label="选择规则" :options="rules" />
                        <BaseInput v-model="selectTime.startTime" type="time" label="开机时间" />
                        <BaseInput v-model="selectTime.endTime" type="time" label="关机时间" />
                        <div>
                            <span>循环方式</span>
                            <BaseCheckbox v-model="selectTime.isWorkday" label="工作日" />
                        </div>
                        <div v-if="!selectTime.isWorkday">
                            <BaseInput v-model="selectTime.startDate" type="date" label="开始日期" />
                            <BaseInput v-model="selectTime.endDate" type="date" label="结束日期" />
                        </div>
                    </div>
                </template>
                <template #footer>
                    <v-btn color="primary" variant="flat" @click="confirmTime">绑定</v-btn>
                    <v-btn variant="tonal" @click="showTimeDialog = false">取消</v-btn>
                </template>
            </BasicCard>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import BasicCard from '@/components/binhui/BasicCard.vue'
import axios from 'axios'
// 运行策略的表单字段
const runningRules = ref(
    [
        {
            id: 1,
            strategy_name: '规则名称',
            setting_mode: '制冷',
            temperature_threshold: 26,
            fan_speed: '低速',
            remark: '',
        },
        {
            id: 2,
            strategy_name: '规则名称',
            setting_mode: '制冷',
            temperature_threshold: 26,
            fan_speed: '低速',
            remark: '',
        },
        {
            id: 3,
            strategy_name: '规则名称',
            setting_mode: '制冷',
            temperature_threshold: 26,
            fan_speed: '低速',
            remark: '',
        },
        {
            id: 4,
            strategy_name: '规则名称',
            setting_mode: '制冷',
            temperature_threshold: 26,
            fan_speed: '低速',
            remark: '',
        },
    ]
)
// 模式
const modes = reactive(
    [
        '制冷',
        '制热'
    ],
)
// 风速
const Windspeed = reactive(
    [
        'Low',
        'Medium',
        'High',
        'AUTO'
    ],
)
// 运行策略弹窗
const showRlueDialog = ref(false)
// 添加运行策略弹窗
const addRule = () => {
    showRlueDialog.value = true
}
// // 运行计划表单假数据
// const runningPlan = ref(
//     [
//         {
//             region: ['1'],
//             rule: '',
//             startTime: '',
//             endTime: '',
//             isWorkday: '',
//             startDate: '',
//             endDate: '',
//             editing: false
//         }
//     ]
// )
// 运行计划弹窗假数据
const selectTime = reactive([{
    region: ['19F-1'],
    rule: '秋季运行策略',
    startTime: '7:00',
    endTime: '18:10',
    isWorkday: true,
    startDate: '10-01',
    endDate: '10-07',
}])
// 运行区域假数据的树形下拉选择
const data = [
    {
        value: '1',
        label: '鸿宇25楼',
        children: [
            {
                value: '1-1',
                label: '25楼',
                children: [
                    {
                        value: '1-1-1',
                        label: '会议室1',
                    },
                ],
            },
        ],
    },
    {
        value: '2',
        label: 'Level one 2',
        children: [
            {
                value: '2-1',
                label: 'Level two 2-1',
                children: [
                    {
                        value: '2-1-1',
                        label: 'Level three 2-1-1',
                    },
                ],
            },
            {
                value: '2-2',
                label: 'Level two 2-2',
                children: [
                    {
                        value: '2-2-1',
                        label: 'Level three 2-2-1',
                    },
                ],
            },
        ],
    },
]
// 运行规则假数据
const rules = reactive([
    '冬季运行策略',
    '春季运行策略',
    '夏季运行策略',
    '秋季运行策略',
])
//绑定规则的时间弹窗ist
const showTimeDialog = ref(false)
// 添加时间
const addTime = () => {
    showTimeDialog.value = true
}
//提交时间表单
const confirmTime = () => {
    //提交api操作
    showTimeDialog.value = flase
}

const onSubmit = () => {
    console.log('submit!')
}
</script>

<style scoped>
.boxShadow {
    width: 100%;
    height: 100%;
    background-color: rgba(150, 145, 145, 0.486);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    .boxShadow_Runningrule {
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .boxShadow_Selectime {
        height: 120%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>