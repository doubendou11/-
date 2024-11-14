import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashBoard from '../views/DashBoard.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/DashBoard',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/deviceM',
      name: 'deviceM',
      children: [
        {
          path: '/deviceM/airM',
          name: 'airM',
          children: [
            {
              name: 'indoor',
              path: '/indoor',
              component: () => import('../views/deviceM/airM/indoor.vue'),
            },
            {
              name: 'airplanning',
              path: '/airplanning',
              component: () => import('../views/deviceM/airM/airplanning.vue'),
            },
            {
              name: 'waterchiler',
              path: '/waterchiler',
              component: () => import('../views/deviceM/airM/waterchiler.vue'),
            },
            {
              name: 'operationdiary',
              path: '/operationdiary',
              component: () => import('../views/deviceM/airM/operationdiary.vue'),
            },
            {
              name: 'groupcontrol',
              path: '/groupcontrol',
              component: () => import('../views/deviceM/airM/groupcontrol.vue'),
            },
          ]
        },
      ]
    },
    {
      path: '/energyM',
      name: 'energyM',
      children: [
        {
          name: 'ElectricEnergy',
          path: '/ElectricEnergy',
          component: () => import('../views/energyM/ElectricEnergy.vue'),
        },
        {
          name: 'EnergyComparsion',
          path: '/EnergyComparsion',
          component: () => import('../views/energyM/energycomparsion.vue'),
        },
        {
          name: 'waterchilerenergy',
          path: '/waterchilerenergy',
          component: () => import('../views/energyM/WaterChilerEnergy.vue'),
        },
        {
          name: 'airenergy',
          path: '/airenergy',
          component: () => import('../views/energyM/AirEnergy.vue'),
        },
      ]
    },
    {
      path: '/alarmM',
      name: 'alarmM',
      children: [
        {
          name: 'alarmRrecords',
          path: '/alarmRrecords',
          component: () => import('../views/alarmM/AlarmRrecords.vue'),
        },
        {
          name: 'alarmStatistics',
          path: '/alarmStatistics',
          component: () => import('../views/alarmM/AlarmStatistics.vue'),
        },
        {
          name: 'alarmStrategy',
          path: '/alarmStrategy',
          component: () => import('../views/alarmM/AlarmStrategy.vue'),
        },
      ]
    },




    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
