<script setup>
  import { useMainStore } from '../store/useMainStore'; 

    const mainStore = useMainStore();
    const props = defineProps({
        nameOfColumn: String
    })

</script>

<template>
    <th class="group cursor-pointer px-2 py-2 text-center text-sm font-semibold hover:bg-blue-500 transition min-w-[70px] ">
        <button :class="{'text-blue-100': mainStore.isDark, 'text-blue-500': !mainStore.isDark}" class="cursor-pointer text-xs group-hover:text-white transition">
            {{ nameOfColumn }}
        </button>
    </th>
</template>
