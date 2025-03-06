<script setup>
import { onMounted } from 'vue';
import { useMainStore } from './store/useMainStore';
import './style.css';
import HeaderComponent from './components/HeaderComponent.vue';
import TableComponent from './components/TableComponent.vue';


const mainStore = useMainStore();

onMounted(() => {
  mainStore.loadPhotos();
});

</script>

<template>
  <div :class="{'dark-theme': mainStore.isDark, 'light-theme': !mainStore.isDark}" class="min-h-screen">
    <HeaderComponent />
    <TableComponent />
  </div>
</template>
