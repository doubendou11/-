<template>
  <svg width="110" viewBox="0 0 136 141" fill="none" xmlns="http://www.w3.org/2000/svg"
    :style="{ position: 'absolute', top: positionTop + 'px', left: positionLeft + 'px' }">
    <g filter="url(#filter0_b_1977_276)">
      <path
        d="M7.93862 9.0189C8.79893 3.81609 13.2979 0 18.5713 0H119.221C124.716 0 129.332 4.13428 129.934 9.5962L135.064 56.1399C135.126 56.6997 134.922 57.2559 134.512 57.6426L127.642 64.1308C127.283 64.4701 127.08 64.9425 127.08 65.4367V80.9821C127.08 81.4585 127.269 81.9154 127.606 82.2522L134.543 89.1894C134.934 89.5804 135.123 90.1297 135.056 90.6785L130.038 131.537C129.374 136.94 124.785 141 119.341 141H18.4031C13.2041 141 8.7462 137.288 7.80434 132.175L0.158958 90.6718C0.0586503 90.1273 0.215084 89.5669 0.582935 89.1531L6.73101 82.2365C7.02327 81.9077 7.18471 81.4831 7.18471 81.0432V65.3747C7.18471 64.9172 7.0101 64.4769 6.69651 64.1437L0.609131 57.6759C0.225255 57.268 0.0536181 56.7044 0.144993 56.1518L7.93862 9.0189Z"
        fill="url(#paint0_linear_1977_276)" />
      <path
        d="M18.5713 0.449045H119.221C124.488 0.449045 128.91 4.41106 129.487 9.6454L134.618 56.1891C134.664 56.6089 134.511 57.0261 134.204 57.3161L127.334 63.8044C126.885 64.2285 126.631 64.8189 126.631 65.4367V80.9821C126.631 81.5776 126.867 82.1487 127.288 82.5697L134.225 89.507C134.519 89.8002 134.66 90.2121 134.61 90.6237L129.592 131.482C128.956 136.66 124.558 140.551 119.341 140.551H18.4031C13.4207 140.551 9.14857 136.994 8.24595 132.094L0.600572 90.5905C0.525342 90.1821 0.642667 89.7618 0.918555 89.4514L7.06663 82.5349C7.43196 82.1239 7.63376 81.5931 7.63376 81.0432V65.3747C7.63376 64.8028 7.41549 64.2524 7.02351 63.8359L0.936125 57.3681C0.648218 57.0622 0.519491 56.6395 0.588022 56.2251L8.38165 9.09216C9.20611 4.10613 13.5176 0.449045 18.5713 0.449045Z"
        stroke="url(#paint1_linear_1977_276)" stroke-width="0.898089" />
    </g>
    <path d="M14.3694 26.0447L62.8662 26.0447L69.1528 30.5351L74.5414 26.0447L121.242 26.0447" stroke="#A2B9E7"
      stroke-width="0.449045" />
    <defs>
      <!-- 背景样式 -->
      <linearGradient id="paint0_linear_1977_276" x1="69.1529" y1="0" x2="69.1529" y2="141"
        gradientUnits="userSpaceOnUse">
        <stop stop-color="#143F93" stop-opacity="0.45" />
        <stop offset="1" stop-color="#052A73" stop-opacity="0.96" />
      </linearGradient>
      <!--  线框样式-->
      <linearGradient id="paint1_linear_1977_276" x1="67.5812" y1="0" x2="67.5812" y2="141"
        gradientUnits="userSpaceOnUse">
        <stop stop-color="#6887C7" />
        <stop offset="0.061458" stop-color="#6A92E2" />
        <stop offset="1" stop-color="#2A4986" />
      </linearGradient>
    </defs>
    <text fill="#FFFFFF" font-family="Inter" font-size="16" font-weight="500" letter-spacing="0em" text-anchor="middle">
      <tspan x="50%" y="13%">{{ roomId }}</tspan>
      <tspan x="50%" y="50%">温度:{{ temperature }}</tspan>
      <tspan x="50%" y="70%">湿度:{{ humidity }}</tspan>
      <tspan x="50%" y="90%">{{ occupancy }}</tspan>
    </text>
  </svg>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  roomId: String,
  temperature: String,
  humidity: String,
  occupancy: String,
  positionTop: Number,
  positionLeft: Number
})
</script>
