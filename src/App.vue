<template>
  <v-app>
    <v-app-bar app color="blue-darken-2" dark>

      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>成都青白江铁路港木材物流仓库项目</v-toolbar-title>

      <v-btn text rounded>
        登录
      </v-btn>
    </v-app-bar>
    <Menu :menuItems="menuItems" :modelValue="drawer" @update:modelValue="drawer = $event"></Menu>
    <v-main id="app">
      <router-view></router-view>
    </v-main>
    <v-footer class="justify-center" app color="blue-darken-2" padless>&copy; 2024 
      成都东迈电子科技有限责任公司</v-footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import Menu from '@/components/Menu.vue'; // Adjust the path as needed
const drawer = ref(true); // Set initial value to false

function toggleDrawer() {
  drawer.value = !drawer.value;
}

const menuItems2 = ref([
  {
    title: '首页',
    icon: 'mdi-home',
    route: '/index',
  },
  {
    title: '设备管控',
    icon: "mdi-account",
    items: [
      {
        title: '空调系统',
        icon: 'mdi-device',
        subItems: [
          {
            title: 'Sub Item 1',
            route: '/device1',
          },
          {
            title: 'Sub Item 2',
            route: '/device1',
          },

          // Add more sub-items as needed
        ],
      },
      // Add more items as needed
      {
        title: '空调运行策略',
        icon: 'mdi-device',

      },
      {
        title: '水冷机系统',
        icon: 'mdi-device',

      },
    ],

  },
  {
    title: '能耗管理',
    icon: 'mdi-home',
    items: [
      {
        title: '空调系统能耗',
        icon: 'mdi-energy',
        subItems: [
          {
            title: 'Sub Item 1',
            route: '/energy1',
          },
          // Add more sub-items as needed
        ],
      },
      {
        title: '能耗对比分析',
        icon: 'mdi-energy',
        subItems: [
          {
            title: 'Sub Item 1',
            route: '/energy1',
          },
          // Add more sub-items as needed
        ],
      },
      // Add more items as needed
    ],
  },
]);

// Data structure for menu items
// const menuItems = [
//   {
//     title: '首页',
//     icon: 'mdi-home',
//     to: '/home', // Assuming you have routing set up
//   },
//   {
//     title: '能耗统计',
//     icon: 'mdi-home',
//     to: '/statics', // Assuming you have routing set up
//   },
//   {
//     title: '设备管控',
//     icon: 'mdi-account-circle',
//     children: [
//       {
//         title: 'Admin',
//         children: [
//           { title: 'Management', icon: 'mdi-account-multiple-outline', to: '/users/admin/management' },
//           { title: 'Settings', icon: 'mdi-cog-outline', to: '/users/admin/settings' },
//         ],
//       },
//       {
//         title: 'Actions',
//         children: [
//           { title: 'Create', icon: 'mdi-plus-outline', to: '/users/actions/create' },
//           { title: 'Read', icon: 'mdi-file-outline', to: '/users/actions/read' },
//           { title: 'Update', icon: 'mdi-update', to: '/users/actions/update' },
//           { title: 'Delete', icon: 'mdi-delete', to: '/users/actions/delete' },
//         ],
//       },
//     ],
//   },
// ];


// const menuItems = [
//   {
//     title: '首页',
//     icon: 'mdi-home',
//     to: '/', // Assuming you have routing set up
//   },
//   {
//     title: '智慧控制',
//     icon: 'mdi-air-conditioner',
//     path: '/deviceM',
//         children: [
//           { title: '室内空调系统', icon: 'mdi-air-conditioner', to: '/AirconditionersBoard' },
//           { title: '空调运行策略', icon: 'mdi-content-save-edit-outline', to: '/AirPlanning'},
//           { title: '水冷机组系统', icon: 'mdi-account-multiple-outline', to: '/WaterChiler'},
//           { title: '操作日志', icon: 'mdi-account-box-edit-outline', to: '/OperationDiary'},
//           { title: '群控策略', icon: 'mdi-folder-clock-outline', to: '/GroupControl'},
//         ],
//   },
//   {
//     title: '能耗监测',
//     icon: 'mdi-lightning-bolt',
//     path: `/energyM`,
//     children: [
//       { title: '室内空调系统', icon: 'mdi-air-conditioner', to: '/AirEnergy'},
//       { title: '水冷机组系统', icon: 'mdi-snowflake', to: '/WaterChilerEnergy'},
//       { title: '电表能耗监测', icon: 'mdi-lightning-bolt-circle', to: '/ElectricEnergy'},
//     ],
//   },
//   {
//     title: '报警管理',
//     icon: 'mdi-alarm-light',
//     path: `/alarmM`,
//     children: [
//       { title: '报警统计', icon: 'mdi-account-box-edit-outline', to: '/AlarmStatistics'},
//       { title: '报警记录', icon: 'mdi-folder-clock-outline', to: '/AlarmRrecords'},
//       { title: '报警策略', icon: 'mdi-folder-clock-outline', to: '/AlarmStrategy'},
//     ],
//   },
//   {
//     title: '后台管理',
//     icon: 'mdi-cog',
//     path: `/backendM`,
//     children: [
//       { title: '区域管理', icon: 'mdi-account-box-edit-outline', to: '/RegionM'},
//       { title: '设备管理', icon: 'mdi-folder-clock-outline', to: '/DeviceM'},
//       { title: '操作日志', icon: 'mdi-folder-clock-outline', to: '/ControlM'},
//     ],
//   },
// ];
const menuItems = [
  {
    title: '首页',
    icon: 'mdi-home',
    to: '/', // Assuming you have routing set up
  },
  {
    to: '/dashboard', // Assuming you have routing set up
    title: '总览面板',
    icon: 'mdi-monitor-dashboard',
  },
  {
    title: '设备管理',
    icon: 'mdi-devices',
    path: '/deviceM',
    children: [
      {
        title: '空调系统',
        icon: 'mdi-air-conditioner',
        path: '/deviceM/air-conditioning',
        children: [
          { title: '室内空调', icon: 'mdi-air-conditioner', to: '/deviceM/airM/indoor' },
          { title: '水冷系统', icon: 'mdi-water-pump', to: 'deviceM/airM/waterchiler' },
          { title: '运行策略', icon: 'mdi-play-circle-outline', to: '/deviceM/airM/airplanning' },
          { title: '操作日志', icon: 'mdi-book-open-page-variant', to: '/deviceM/airM/operationdiary' },
        ],
      },
      {
        title: '电力系统',
        icon: 'mdi-flash',
        path: '/deviceM/electric',
        children: [
          { title: '电表监控', icon: 'mdi-meter-electric', to: '/deviceM/electric/meters' },
          { title: '能源分配', icon: 'mdi-transmission-tower', to: '/deviceM/electric/distribution' },
          { title: '操作日志', icon: 'mdi-book-open-page-variant', to: '/deviceM/electric/logs' },
        ],
      },
      {
        title: '照明控制',
        icon: 'mdi-lightbulb-on-outline',
        path: '/deviceM/lighting',
        children: [
          { title: '群控策略', icon: 'mdi-folder-clock-outline', to: '/GroupControl' },
          { title: '智能照明', icon: 'mdi-lightbulb-on', to: '/deviceM/lighting/smart-lighting' },
          { title: '操作日志', icon: 'mdi-book-open-page-variant', to: '/deviceM/lighting/logs' },
        ],
      },
      {
        title: '安全系统',
        icon: 'mdi-security',
        path: '/deviceM/security',
        children: [
          { title: '监控摄像头', icon: 'mdi-cctv', to: '/deviceM/security/cameras' },
          { title: '门禁系统', icon: 'mdi-door', to: '/deviceM/security/access-control' },
          { title: '操作日志', icon: 'mdi-book-open-page-variant', to: '/deviceM/security/logs' },
        ],
      },
    ],
  },
  {
    title: '能耗管理',
    icon: 'mdi-lightning-bolt',
    path: '/energyM',
    children: [
      { title: '电表能耗监测', icon: 'mdi-flash-auto', to: '/energyM/electricenergy' },
      { title: '能耗分析', icon: 'mdi-chart-line', to: '/energyM/energycomparsion' },
      { title: '水冷机能耗监测', icon: 'mdi-leaf', to: '/energyM/waterchilerenergy' },
      { title: '空调能耗监测', icon: 'mdi-air-conditioner', to: '/energyM/airenergy' },
    ],
  },
  {
    title: '报警管理',
    icon: 'mdi-bell-ring',
    path: '/alarmM',
    children: [
      { title: '报警统计', icon: 'mdi-chart-bar-stacked', to: '/alarmM/alarmRrecords' },
      { title: '报警记录', icon: 'mdi-history', to: '/alarmM/alarmStatistics' },
      { title: '报警策略', icon: 'mdi-shield-account', to: '/alarmM/alarmStrategy' },
    ],
  },
  {
    title: '系统设置',
    icon: 'mdi-cog',
    path: '/settings',
    children: [
      { title: '用户管理', icon: 'mdi-account-multiple', to: '/settings/user-management' },
      { title: '角色权限', icon: 'mdi-shield-account', to: '/settings/role-permissions' },
      { title: '日志管理', icon: 'mdi-folder-clock-outline', to: '/settings/logs' },
      { title: '区域设置', icon: 'mdi-map-outline', to: '/settings/region' },
      { title: '设备配置', icon: 'mdi-devices', to: '/settings/device-configuration' },
    ],
  },
];



</script>


<style>
#app {
  /* background: linear-gradient(rgba(243, 250, 255, 1), rgba(214, 229, 250, 1)); */
  background: linear-gradient(rgba(243, 250, 255, 1), rgb(203, 214, 230));
  /* 您想要的背景颜色 */
  min-height: 100vh;
  /* 确保背景覆盖整个视口 */
}
</style>
