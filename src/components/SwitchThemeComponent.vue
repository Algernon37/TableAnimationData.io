<script setup>
  import { useMainStore } from '../store/useMainStore';
  const mainStore = useMainStore();

</script>

<template>
    <button
      @click="mainStore.toggleDark()"
      class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
    >
      Toggle mode
    </button>
</template>
