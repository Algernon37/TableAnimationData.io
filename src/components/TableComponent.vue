<script setup>
  import Column from './СolumnComponent.vue';
  import RowComponent from './RowComponent.vue';
  import { useMainStore } from '../store/useMainStore'; 
  import { ref } from 'vue';

  const mainStore = useMainStore();
  const tableContainer = ref(null); 

  const scrollFunction = () => {
    const scrollTop = tableContainer.value.scrollTop;
    const scrollHeight = tableContainer.value.scrollHeight;
    const clientHeight = tableContainer.value.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && !mainStore.loadMorePhotosLoading) {
      requestAnimationFrame(async () => {
        mainStore.loadMorePhotosLoading = true;
        await mainStore.loadMorePhotos();
        mainStore.loadMorePhotosLoading = false;
      });
    }
  };

  const sortDataFunction = (column) => {
    mainStore.sortData(column);
  }
</script>

<template>
  <div class="flex justify-center items-center justify-center mt-15">
    <div
      ref="tableContainer"
      class="overflow-x-hidden max-w-[600px] max-h-[600px]"
      @scroll="scrollFunction"
    >
    <table class="min-w-full border-collapse table-fixed break-all">
      <thead :class="{'bg-gray-700': mainStore.isDark, 'bg-gray-100': !mainStore.isDark}" class="sticky top-0">
        <tr>
          <Column 
              :name-of-column="'Ид'" 
              @click="sortDataFunction('id')" 
            />
            <Column 
              :name-of-column="'Альбом'" 
              @click="sortDataFunction('albumId')" 
            />
            <Column 
              :name-of-column="'Название'" 
              @click="sortDataFunction('title')" 
            />
            <Column 
              :name-of-column="'Ссылка'" 
              @click="sortDataFunction('url')" 
            />
            <Column 
              :name-of-column="'Миниатюра'" 
              @click="sortDataFunction('thumbnailUrl')" 
            />
        </tr>
      </thead>
      <tbody>
          <tr v-if="mainStore.initialLoading" :class="{'bg-gray-700': mainStore.isDark, 'bg-gray-100': !mainStore.isDark}">
            <td colspan="5" class="text-center">
              <h2 :class="{'text-white': mainStore.isDark, 'text-slate-600': !mainStore.isDark}" class="text-xl font-bold uppercase">Загрузка...</h2> 
            </td>
          </tr>
          <tr v-for="(row) in mainStore.photos" :key="row.id">
            <RowComponent :title="row.id" />
            <RowComponent :title="row.albumId" />
            <RowComponent :title="row.title" />
            <RowComponent :title="row.url" />
            <RowComponent :title="row.thumbnailUrl" />
          </tr>
        </tbody>
    </table>
    <h2 v-if="mainStore.loadMorePhotosLoading" :class="{'text-white': mainStore.isDark, 'text-slate-600': !mainStore.isDark}" class="text-center text-base uppercase font-semibold">Загрузка...</h2>
    </div>
  </div>
</template>
