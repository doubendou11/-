<template>
    <v-container fluid>
        <v-row>
            <v-col cols="10">
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-item>
                                <div class="d-flex align-center">
                                    <v-card-title>{{ title.mainTitle }}</v-card-title>
                                    <v-card-subtitle class="pa-3">{{ nowTime }}</v-card-subtitle>
                                </div>

                                    <BasicCard4 :title="title">
                                        <template #selectTime>
                                            <span class="subTitle">00:00至{{ moment().format("HH:mm") }} </span>
                                        </template>
                                    </BasicCard4>
                                    <!-- <div class="index-left-div-yn">
                                        <div style="display: flex">
                                            <span class="mainTitle">
                                                {{ title.card2Title }}
                                            </span>
                                            <span class="subTitle">{{ moment().startOf("months").format("MM-DD")
                                                }}至{{ moment().format("MM-DD") }}
                                            </span>
                                        </div>
                                        <span class="index-title-font2">{{ list }}&nbsp;</span>
                                        <div>
                                            <br />
                                        </div>
                                    </div>
                                    <div class="index-left-div-yn">
                                        <div style="display: flex">
                                            <span class="mainTitle">
                                                {{ title.card3Title }}
                                            </span>
                                            <span class="subTitle">01-01至{{ moment().format("MM-DD") }} </span>
                                        </div>
                                        <span class="index-title-font2">{{ list }}&nbsp;</span>
                                        <div>
                                            <br />
                                        </div>
                                    </div> -->

                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>

                    </v-col>
                </v-row>
                <v-row>

                </v-row>
            </v-col>
            <v-col cols="2">
                <v-row>

                </v-row>
                <v-row>

                </v-row>
                <v-row>

                </v-row>
            </v-col>
        </v-row>


    </v-container>
</template>
<script setup>
import axios from "axios";
import moment from "moment";
import { ref, onMounted, reactive, onUnmounted } from "vue";
import BasicCard4 from "@/components/binhui/BasicCard4.vue"
onUnmounted(() => {
    timeInterval = null;
});
const title = ref({
    mainTitle: "用能概览",
    cardTitle: "今日累计用电",
    cardList: "11111",
    card2Title: "本月累计用电",
    monthTitle: "较上月用电",
    card3Title: "今年累计用电",
    yearTitle: "较去年用电",
    subTitle: "总用电曲线",
    unit: "kWh",
});
//实时时间器
const nowTime = ref();
let timeInterval = setInterval(() => {
    nowTime.value = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
}, 1000);
</script>
<style scoped>
.v-card {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    height: 100%;
}

.index-left-div-yn {
    width: 33%;
    height: 84px;
    padding: 10px;
    border: 1px solid #eeeeee;
}
</style>