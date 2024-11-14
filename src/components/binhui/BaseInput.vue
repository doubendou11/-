<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!--$attrs用于将父组件传递的所有非props属性（style,class除外）绑定到子组件的根元素上,可以在子组件上使用父组件中的非props属性，不需要一个个传递-->
    <!--v-model在组件上都是是使用modelValue作为prop,并以update：modelValue作为对应的事件，-->
    <!-- v-model将modelvalue的prop和update：modelValue的event绑定在一起，当子组件的input事件触发时会emit一个update：modelValue事件，从而更新父组件中的message。
    当父组件更新message时，通过modelValue的prop将message传递给子组件。 -->
    <input v-bind="$attrs" :value="modelValue" :placeholder="label" inheritAttrs=false
      @input="$emit('update:modelValue', $event.target.value)" class="Input">
    <!-- @函数监听modelValue的变化，将新的$event.target对象作为参数传递给父组件 -->
  </div>
</template>

<script>
//props：{}中定义要接收的值,那么这个值就可以通过v-bind="$attrs"传递给父组件
//props接收一个传递的modelValue
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}

</script>
<style scoped>
input {
  width: 200px;
  height: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin: 6px;
  font-size: 15px;
  border: 1px solid #e9e6e6;
  text-align: center;
}

/* 选中时改变边框颜色 */
input:focus {
  outline: none;
  /* 移除默认的聚焦轮廓 */
  border: 2px solid #1877dd;
  /* 蓝色边框 */
}

input:hover {
  outline: none;
  /* 移除默认的聚焦轮廓 */
  border: 2px solid #1877dd;
  /* 蓝色边框 */
}
</style>
