  <template>
    <div class="floor-plan">
      <!-- Floor Plan Image -->
      <img src="/image/18F.png" alt="Floor Plan" class="floor-image" ref="floorImage" @load="calculateTooltipPositions" />
  
      <!-- Render Room Tooltips -->
      <div
        v-for="room in rooms"
        :key="room.id"
        class="room-tooltip"
        :style="{ top: room.tooltipTop + 'px', left: room.tooltipLeft + 'px' }"
      >
        <!-- Tooltip content always visible showing room status -->
        <div class="tooltip">{{ room.temperature }} | Status: {{ room.status }}</div>
      </div>

       <!-- Render Air Outlet Icons using v-for -->
    <img
      v-for="outlet in airOutlets"
      :key="outlet.id"
      :src="outlet.isOn ? '/src/assets/image/icon_on.png' : '/src/assets/image/icon_off.png'"
      alt="Air Outlet Status"
      class="icon"
      :style="{ top: outlet.iconTop + 'px', left: outlet.iconLeft + 'px' }"
    />


    </div>
    //增加电表查询
    <div id ="meterChart">
        <MeterDataChart/>
    </div>
   
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import MeterDataChart from '@/components/MeterQuery/MeterDataChart.vue';
  
  // Define room data with relative marker positions (percentage-based)
  const rooms = ref([
    { id: 1, markerX: 0.25, markerY: 0.35, temperature: '22°C', status: 'Cooling', tooltipTop: 0, tooltipLeft: 0 },
    { id: 2, markerX: 0.5, markerY: 0.4, temperature: '24°C', status: 'Heating', tooltipTop: 0, tooltipLeft: 0 },
    { id: 3, markerX: 0.75, markerY: 0.3, temperature: '20°C', status: 'Off', tooltipTop: 0, tooltipLeft: 0 },
  ]);

  // Define the air outlets array with relative marker positions and their statuses
const airOutlets = ref([
  { id: 1, markerX: 0.2, markerY: 0.3, isOn: true, iconTop: 0, iconLeft: 0 },
  { id: 2, markerX: 0.52, markerY: 0.42, isOn: false, iconTop: 0, iconLeft: 0 },
  { id: 3, markerX: 0.78, markerY: 0.35, isOn: true, iconTop: 0, iconLeft: 0 },
]);
  
  const floorImage = ref(null);
  
  const calculateTooltipPositions = () => {
    if (!floorImage.value) return;
  
    // Get the dimensions of the floor image
    const imageWidth = floorImage.value.clientWidth;
    const imageHeight = floorImage.value.clientHeight;
  
    // Calculate the absolute positions for each room tooltip based on relative marker positions
    rooms.value.forEach(room => {
      room.tooltipLeft = room.markerX * imageWidth;
      room.tooltipTop = room.markerY * imageHeight;
    });

    // Calculate the absolute positions for each air outlet icon based on relative marker positions
  airOutlets.value.forEach(outlet => {
    outlet.iconLeft = outlet.markerX * imageWidth;
    outlet.iconTop = outlet.markerY * imageHeight;
  });
  };
  
  // Recalculate positions on mounted or image load
  onMounted(() => {
    calculateTooltipPositions();
  });
  </script>
  
  <style scoped>
  .floor-plan {
    position: relative;
    width: 1000px; /* Adjust based on your image size */
    height: 500px; /* Adjust based on your image size */
  }
  
  .floor-image {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .room-tooltip {
    position: absolute;
    width: 100px; /* Adjust based on tooltip size */
    height: 30px; /* Adjust based on tooltip size */
  }
  
  /* Tooltip styles */
  .tooltip {
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
  }

  .icon {
  position: absolute;
  width: 40px; /* Adjust size based on icon size */
  height: 40px; /* Adjust size based on icon size */
}

  /* chart styles */
  #meterChart {
     height: 100px;
  }
  </style>
  