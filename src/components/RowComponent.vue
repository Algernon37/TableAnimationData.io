<script setup>

    const props = defineProps({
        title: {
            type: [String, Number], 
            required: true
        }
    })

</script>

<template>
    <td class="px-4 py-2 border text-sm truncate text-center max-w-[120px]" :title="title">
        {{ title }}
    </td>
</template>
