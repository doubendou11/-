<template>
    <v-list nav dense>
      <template v-for="(item, index) in menu" :key="index">
        <v-list-item v-if="!item.subMenu" :to="item.link">
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
  
        <v-list-group v-else :prepend-icon="item.icon" no-action>
          <template v-slot:activator>
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>
          <menu-component :menu="item.subMenu"/>
        </v-list-group>
      </template>
    </v-list>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    menu: Array,
  });
  </script>
  