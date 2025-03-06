import { defineStore } from 'pinia';
import axios from 'axios';
import { useDark, useToggle } from '@vueuse/core';
import { ref } from 'vue';

export const useMainStore = defineStore('mainStore', () => {
  const photos = ref([]);
  const initialLoading = ref(false);
  const loadMorePhotosLoading = ref(false);
  const error = ref(null);
  const albumIds = ref([]);
  const sortConfig = ref({
    column: '',
    direction: 'asc',
  });
  // Поиск состояние
  const searchId = ref('');
  // Установка и получение ID поиска
  const setSearchId = (newId) => {
    searchId.value = newId;
  };

  // Тема (светлая/тёмная)
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  
  // Методы 
  const loadPhotos = async (albumIdsParam = [], limit = 30) => {
    photos.value = [];
    initialLoading.value = true;
    error.value = null;
    albumIds.value = albumIdsParam;

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
        params: {
          _limit: limit,
          albumId: albumIdsParam,
        },
      });
      loadMorePhotosLoading.value = false;
      photos.value = response.data;
    } catch (err) {
      error.value = `Error fetching photos: ${err.message}`;
      console.error(err);
    } finally {
      initialLoading.value = false;
    }
  };
  const loadMorePhotos = async (limit = 20) => {
    loadMorePhotosLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
        params: {
          _start: photos.value.length,
          _limit: limit,
          albumId: albumIds.value,
        },
      });
      photos.value.push(...response.data);
    } catch (err) {
      error.value = `Error fetching more photos: ${err.message}`;
      console.error(err);
    } finally {
      loadMorePhotosLoading.value = false;
    }
  };
  const sortData = (column) => {
    if (sortConfig.value.column === column) {
      sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sortConfig.value.column = column;
      sortConfig.value.direction = 'asc';
    }
    photos.value.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
  
      if (valueA < valueB) return sortConfig.value.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.value.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return {
    // Фото
    photos,
    initialLoading,
    loadMorePhotosLoading,
    error,
    albumIds,
    sortConfig,
    loadPhotos,
    loadMorePhotos,
    sortData,
    // Поиск
    searchId,
    setSearchId,
    // Тема
    isDark,
    toggleDark,
  };
});
