<!-- InteractiveHoverCard.vue -->
<template>
  <div class="box-size">
    <div class="header-size">
      <h3>{{ title }}</h3>
      <slot name="title">
      </slot>
    </div>
    <div class="container-size">
      <div class="left-content">
        <slot name="left">
        </slot>
      </div>
      <div class="right-content">
        <slot name="right">
        </slot>
      </div>
    </div>

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
.box-size {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.header-size {
  display: flex;
  padding: 0.2rem;
  background: #CADEF8;
  border: 1px #84b1db solid;
  justify-content: space-between;
  border-radius: 2px;
  align-items: center; /* 垂直居中对齐 */

}

h3 {
  padding-left: 5px;
}

.container-size {
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: #707070;
  padding: 0.2rem;
  display: flex;
  justify-content: left;
  background: white;
}
.left-content{
  padding-top: 0.5%;
}
</style>
