<!-- InteractiveHoverCard.vue -->
<template>
  <v-container   class="card"  min-width="20rem"   >
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text class="text-h5 font-weight-black">{{ content }}</v-card-text>
  </v-container>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  content: String,
});
</script>

<style scoped>
.card {
  border-right: 1px solid #ececec; /* 添加右边框 */
  margin: 1rem 0rem 1rem 0rem;
  padding: 0 3rem; /* 添加内边距 */
  
}
.card:last-child {
  border-right: none; /* 移除最后一个卡片的右边框 */
}
</style>
