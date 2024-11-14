<template>
  <div class="panel-container" :style="{ width: `${props.width}px` }">
    <div class="panel-content" :class="{ 'is-active': airData.status === '开机' }">
      <div v-for="(item, index) in panelItems" :key="index" class="panel-content-row">
        <div>{{ item.label }}</div>
        <div>{{ item.value }}<span v-if="item.unit">{{ item.unit }}</span></div>
      </div>
    </div>
    <div class="panel-dot" :class="{ 'is-active': airData.status === '开机' }"></div>

    <div class="btn-group">
      <button v-for="btn in buttons" :key="btn.id" @click="btn.clickHandler">
        <i :class="btn.iconClass"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';

const props = defineProps({
  id: Number,
  width: { type: Number, default: 320 },
});



// const panelItems = ref([
//   {
//     label: '风速', // Wind Speed
//     value: '中档', // Medium
//   },
//   {
//     label: '温度', // Temperature
//     value: '24',
//     unit: '℃', // Celsius
//   },
//   {
//     label: '模式', // Mode
//     value: '制冷', // Cooling
//   },
//   // ... more items as needed
// ]);
// Define airData as a reactive ref object
const airData = ref({
  wind: 'Low', // Default value
  temp: 22,    // Default value in Celsius
  mode: 'Cool', // Default value
  status: '开机', // Default status
  // ... add other necessary properties
});


const panelItems = computed(() => [
  {
    label: '风速', // Wind Speed
    value: airData.value.wind,
  },
  {
    label: '温度', // Temperature
    value: `${airData.value.temp}℃`,
  },
  {
    label: '模式', // Mode
    value: airData.value.mode,
  },
  {
    label: '状态', // Status
    value: airData.value.status === '开机' ? '运行中' : '已关机',
  }
]);



const buttons = ref([
  {
    iconClass: 'iconfont icon-turnoff',
    clickHandler: onStatusClick,
    label: 'Power' // Label is optional, used for accessibility (e.g., aria-label)
  },
  {
    iconClass: 'iconfont icon-cloud-sync',
    clickHandler: onWindClick,
    label: 'Wind Speed'
  },
  {
    iconClass: 'iconfont icon-m',
    clickHandler: onModeClick,
    label: 'Mode'
  },
  {
    iconClass: 'iconfont icon-arrow-up-filling',
    clickHandler: onUpClick,
    label: 'Temperature Up'
  },
  {
    iconClass: 'iconfont icon-arrow-down-filling',
    clickHandler: onDownClick,
    label: 'Temperature Down'
  }
]);


const width = ref(300); // Set a default width or receive it from props
// ... other reactive properties and methods


// Example functions for handling button clicks

function onStatusClick() {
  airData.value.status = airData.value.status === '开机' ? '关机' : '开机';
}

function onWindClick() {
  // This is just an example change
  const winds = ['Low', 'Medium', 'High'];
  let index = winds.indexOf(airData.value.wind);
  airData.value.wind = winds[(index + 1) % winds.length];
}

function onModeClick() {
  // Toggle between some example modes
  const modes = ['Cool', 'Heat', 'Fan', 'Dry'];
  let index = modes.indexOf(airData.value.mode);
  airData.value.mode = modes[(index + 1) % modes.length];
}

function onUpClick() {
  if (airData.value.temp < 30) {
    airData.value.temp++;
  }
}

function onDownClick() {
  if (airData.value.temp > 16) {
    airData.value.temp--;
  }
}

watchEffect(() => {
  // Respond to changes in props.id and other reactive data
});
</script>

<style lang="scss" scoped>
$active-color: #1d51fe;
$deactive-color: rgba(0, 0, 0, 0.77);
$background-color: #dcd2cc;
$dot-size: 10%;
$panel-padding: 4%;

.panel-container {
  background-color: $background-color;
  padding: $panel-padding;
  border-radius: 5%;
  box-shadow: 5px 5px 5px #999;

  .panel-content {
    &.is-active {
      background-color: $active-color;
      color: #fff;
    }

    .panel-content-row {
      display: flex;
      justify-content: space-between;
      padding: 7px;
      border-bottom: 1px solid #fff;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .panel-dot {
    &.is-active {
      background-color: green;
    }

    background-color: $deactive-color;
    width: $dot-size;
    height: $dot-size;
    border-radius: 50%;
    box-shadow: 3px 3px 3px #999;
    margin:auto;
    float: right;
  }

  .btn-group {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    i {
      font-size: 25px;
    }
  }
}
</style>