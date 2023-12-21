<script setup>
import { store } from '../../store/index.js';
import ChevronSvg from '../svg/ChevronSvg.vue';
</script>

<template>
     <div class="icon" v-if="store.more_options_open"></div>
     <ChevronSvg v-else/>
</template>