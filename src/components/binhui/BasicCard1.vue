<!-- InteractiveHoverCard.vue -->
<template>
  <div class="box-size">
    <div class="header-size">
      <h3>{{ title }}<slot name="title"></slot>
      </h3>
    </div>
    <div class="container-size">
      <slot name="content">
      </slot>
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
}

.header-size {
  padding: 4px;
  background: #CADEF8;
  border: 1px #84b1db solid;
  display: flex;
  align-items: center;
  color: #1a1919;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 2px;
}

.container-size {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-top: 1px;
  color: #707070;
  padding: 1rem;
  min-height: 120px;
}
</style>
