<script setup>
import { store } from '../../store/index.js';
const props = defineProps(['src_1', 'src_2', 'cap_1', 'cap_2']);
</script>

<template>
    <img :src="src_1" :alt="cap_1" v-if="store.current_site_detail_figure === 0"/>
    <img :src="src_2" :alt="cap_2" v-else/>
</template>