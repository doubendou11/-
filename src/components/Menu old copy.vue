  <template>
    <v-navigation-drawer app v-model="drawer">
      <!-- Main menu items -->
      <v-list dense>
        <!-- Loop through menu items -->
        <template v-for="(menuItem, index) in menuItems" :key="index">
          <!-- Main menu item -->
          <v-list-item  :prepend-icon="menuItem.icon" v-if="!menuItem.items" @click="navigateTo(menuItem.route)">
            <!-- <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ menuItem.icon }}</v-icon>
              </v-list-item-icon>      
            </template> -->
           
           <v-list-item-title >{{ menuItem.title }} </v-list-item-title>
          </v-list-item>
  
          <!-- Sub-menu items -->
          <v-list-item-group v-else :key="menuItem.title">
            <v-list-item :prepend-icon="menuItem.icon" @click="toggleSubItems(index)">
              <!-- <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>{{ menuItem.icon }}</v-icon>
                </v-list-item-icon>
              </template> -->
              <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
            </v-list-item>
  
            <v-list-item v-for="(subItem, subIndex) in menuItem.items" :key="subIndex" v-if="showSubItems[index]">
              <v-list-item-title @click="navigateTo(subItem.route)">{{ subItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
  
          <v-divider v-if="index !== menuItems.length - 1"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Menu',
    props: {
      menuItems: {
        type: Array,
        required: true,
      },
      navigateTo: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const drawer = ref(true);
      const showSubItems = ref(Array(props.menuItems.length).fill(false));
  
      const toggleSubItems = (index) => {
        showSubItems.value[index] = !showSubItems.value[index];
      };
  
      return {
        drawer,
        showSubItems,
        toggleSubItems,
      };
    },
  };
  </script>
  