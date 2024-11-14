<template>

      <!-- Filter Dropdown -->
          <v-combobox
            v-model="selectedFilter"
            :items="filters"
            label="风冷机组系统"
            single-line
            @change="filterList"
            variant="solo"
          ></v-combobox> 
      <!-- List Menu based on the filter -->

          <v-list dense>
            <v-list v-model="selectedItem" color="primary">
              <v-list-item
                v-for="(item, index) in filteredItems"
                :key="index"
                @click="() => onSelectItem(item)"
              >
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-list>


  </template>
  
  <script setup>
  import { ref, reactive, watch, onMounted } from 'vue';
  
  const selectedFilter = ref(null);
  const selectedItem = ref(null);
  const props = defineProps(["filters","items"]);
  const filteredItems = ref([]);
  
  // Method to filter the list based on the selected filter
  const filterList = () => {
    if (selectedFilter.value && selectedFilter.value !== 'All') {
      filteredItems.value = props.items.filter(
        (item) => item.category === selectedFilter.value
      );
    } else {
      filteredItems.value = props.items;
    }
  };
  
  // Method to handle item selection
  const onSelectItem = (item) => {
    // Handle the item selection
    console.log(item.text, 'selected');
  };
  
  // Watcher to re-filter the list whenever the selected filter changes
  watch(selectedFilter, filterList);
  
  // Mounted hook to initialize the filtered list
  onMounted(filterList);
  </script>
  