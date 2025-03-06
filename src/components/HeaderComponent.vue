<script setup>
  import { useMainStore } from '../store/useMainStore';
  import { computed, watch } from 'vue';
  import SwitchThemeComponent from './SwitchThemeComponent.vue';

  const mainStore = useMainStore();

  const searchId = computed({
    get: () => mainStore.searchId,
    set: (value) => mainStore.setSearchId(value)
  });

  const handleSearch = async () => {
    const albumIds = searchId.value.split(" ").map(id => id.trim()).filter(Boolean);
    mainStore.loadPhotos(albumIds);
  };

  watch(searchId, (newVal) => {
    if (!newVal.trim()) {
      mainStore.loadPhotos();
    }
  });

</script>

<template>
  <header class="flex flex-col md:flex-row justify-between border-b border-slate-200 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-20">
      <h2 :class="{'text-slate-300': mainStore.isDark, 'text-slate-800': !mainStore.isDark}" class="text-sm lg:text-xl font-bold uppercase">
        Таблица данных с тестового сервиса jsonplaceholder
      </h2>
    </div>
    <div class="flex flex-col gap-4 sm:flex-row items-center justify-center space-x-4 mt-4"> 
      <div class="relative">
        <input
          v-model="searchId" 
          type="text"
          class="border border-slate-200 rounded-md py-2 pl-2 pr-2 outline-none focus:border-gray-400"
          placeholder="Поиск по ID.."
        />
      </div>
      <button @click="handleSearch" class="min-w-[100px] bg-blue-500 text-white py-2 px-4 rounded flex items-center cursor-pointer hover:bg-blue-600 hover:text-white transition">
        <img src="/search.svg" alt="search icon" class="w-4 h-4 mr-2" />
          Поиск
      </button>
      <SwitchThemeComponent />
    </div>
  </header>
</template>

