<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select class="Select" :value="modelValue" v-bind="{
      ...$attrs,
      onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
    }">
      <option v-for="option in options" :value="option" :key="option" :selected="option === modelValue">{{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true
  }
})
</script>
<style scoped>
select {
  -webkit-appearance: none;
  /* 移除默认的下拉箭头样式 */
  -moz-appearance: none;
  appearance: none;
  width: 200px;
  height: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin: 5px;
  font-size: 16px;
  border: 1px solid #e9e6e6;
  transition: border-color 0.2s ease;
  text-align: center;
}

/* 选中时改变边框颜色 */
select:focus {
  outline: none;
  /* 移除默认的聚焦轮廓 */
  border: 2px solid #1877dd;
  /* 蓝色边框 */
}

select:hover {
  outline: none;
  /* 移除默认的聚焦轮廓 */
  border: 2px solid #1877dd;
  /* 蓝色边框 */
}
</style>
