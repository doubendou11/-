<!-- InteractiveHoverCard.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <div>
        <h3 class="card-title">{{ title }}</h3>
        <div class="title-line"></div>
      </div>
      <div class="title-right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
    <div class="footer-content">
      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  footer: String,
});
</script>

<style scoped>
.card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: linear-gradient(119deg, #E7EDFE 0%, #F4FBFF 100%);
  padding: 0.5rem;
  cursor: pointer;
  border: 1px solid transparent;
  /* smooth transition */
  border: 2px white solid;
  min-width: 220px;
  max-height: 580px;
  display: flex;
  /* 使用 flex 布局 */
  flex-direction: column;
  /* 垂直排列 */
  overflow: hidden;
  /* 隐藏溢出内容 */
}

.card:hover {
  transform: translateY(-2px);
}

.card-header {
  position: relative;
  /* Needed to position the line correctly */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.title-line {
  height: 3px;
  background-color: #2795FF;
  width: 110px;
}
.title-right{
  display: flex;
  padding-right: 1%;
}
.card-content {
  font-size: 16px;
  color: #666;
  overflow: hidden;
  margin: 5px;
  display: grid;
  grid-template-columns: 1fr;
  flex: 1;
  /* 使内容区域占据剩余空间 */
  overflow: hidden;
  /* 隐藏溢出内容 */
}

.footer-content {
  display: flex;
  justify-content: space-around;
  margin-left: 100px;
}
</style>