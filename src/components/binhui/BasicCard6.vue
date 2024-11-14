<!-- InteractiveHoverCard.vue -->
<template>
  <div class="alarmCard">
    <div class="outline">
      <!-- <div class="circle">
      </div> -->
      <slot name="circle"></slot>
      <span class=title>{{ title }}</span>
    </div>
    <span class="number">{{ 0 }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  content: String,
});
</script>

<style scoped>
.alarmCard {
  min-width: 240px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-around;
  padding: 0.2%;
}

.outline {
  min-width: 200px;
  background: linear-gradient(90deg, #E9EDF7 65%, rgba(255, 255, 255, 0) 100%);
  position: relative;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  align-items: center;
  justify-content: space-around;
  padding: 8% 0 8% 0 ;

}

.circle {
  width: 18px;
  height: 18px;
  background: rgb(148, 13, 171, 1);
  border-radius: 50%;
}

.title {
  color: rgba(146, 161, 184, 1);
  font-size: 22px;
}

.number {
  font-size: 25px;
  padding-left: 10%;
}
</style>
