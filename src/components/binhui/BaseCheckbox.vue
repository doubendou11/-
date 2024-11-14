<template>
    <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox" />
    <label v-if="label">{{ label }}</label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.checkbox {
  width: 25px;
  height: 15px;
  margin: 6px;

}

.checkbox:hover {
  outline: none;
  /* 移除默认的聚焦轮廓 */
  border: 2px solid #1877dd;
  /* 蓝色边框 */
}
</style>
