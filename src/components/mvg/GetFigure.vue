<script setup>
const props = defineProps(['img_src', 'img_caption']);
</script>

<template>
    <figure class='detail_figure'>
        <img :src="img_src" :alt="img_caption"/>
        <figcaption class='detail_caption'>
            <p v-html="img_caption"></p>
        </figcaption>
    </figure>
</template>