<script setup>
import { store } from '../../store/index.js';
const props = defineProps(['caption_1', 'caption_2']);
</script>

<template>
    <figcaption class='detail_caption' v-if="store.current_site_detail_figure === 0">
        <p v-html="caption_1"></p>
    </figcaption>
    <figcaption class='detail_caption' v-else>
        <p v-html="caption_2"></p>
    </figcaption>
</template>