<template>
    <v-navigation-drawer
    app
    color="blue-darken-2"
    v-model="internalDrawer"
    permanent
  >
    <v-list >
      <template v-for="(item, index) in menuItems" :key="index">
       
        <v-list-item v-if="!item.children" :prepend-icon="item.icon" :title="item.title" @click="navigateTo(item.to)" ></v-list-item>

        <v-list-group v-else :prepend-icon="item.icon" :value="item.title">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="item.title" @click="navigateTo(item.to)"></v-list-item>
          </template>

        
          <template v-for="(child, childIndex) in item.children" :key="`child-${childIndex}`">
            <v-list-item v-if="!child.children" :prepend-icon="child.icon" :title="child.title" @click="navigateTo(child.to)"></v-list-item>

            <v-list-group v-else :value="child.title">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :title="child.title" @click="navigateTo(child.to)"></v-list-item>
              </template>

              <v-list-item
                v-for="(grandchild, grandChildIndex) in child.children"
                :key="`grandchild-${grandChildIndex}`"
                :prepend-icon="grandchild.icon"
                :title="grandchild.title"
                @click="navigateTo(grandchild.to)"
              ></v-list-item>
            </v-list-group>
          </template>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>



<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router'; //import router as the manage route path
const router = useRouter();

const props = defineProps({
  menuItems: Array,
  modelValue: Boolean
});

const emits = defineEmits(['update:modelValue']);
const internalDrawer = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    internalDrawer.value = newValue;
});

watch(internalDrawer, (newValue) => {
    emits('update:modelValue', newValue);
});

const navigateTo = (route) => {
    // Navigation logic here
    router.push(route);
    console.log('Navigating to:', route); // Placeholder
};
</script>


<style scoped>
.v-navigation-drawer ::v-deep .v-list-group__items .v-list-item {
  padding-left: 13px !important;
}
</style>
