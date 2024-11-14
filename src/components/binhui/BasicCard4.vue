<!-- InteractiveHoverCard.vue -->
<template>
  <v-card variant="outlined" color="grey" min-width="300">
    <v-card-item>
      <div class="d-flex align-center pa-1">
        <span class="mainTitle">{{ title.cardTitle }}</span>
        <v-card-subtitle class="pa-3">
          <slot name="selectTime"></slot>
        </v-card-subtitle>
      </div>
      <span class="index-title-font2">
        {{ title.cardList }}
      </span>
      <span class="index-subtitle-font2">{{ title.unit }}</span>
      <div>
        <br />
        <span class="index-gray-font">较昨日同时段</span>
        <span class="index-gray-font c333">2.79%</span>
      </div>
    </v-card-item>
  </v-card>

</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String
});
</script>

<style scoped>
.v-card {
  max-width: 340px;
}

.mainTitle {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  color: rgb(56, 55, 55)
}

.index-title-font2 {
  font-size: 26px;
  color: #409eff;
  line-height: 10px;
  margin-left: 0.8em;
}

.index-subtitle-font2 {
  font-size: 14px;
  color: #409eff;
}

.index-gray-font {
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: #999;
  line-height: 17px;
  margin-left: 1.8em;
}

.index-gray-font.c333 {
  color: #333;
  margin-left: 1em;
}
</style>
