<script setup>
import { store } from '../../store/index.js';
</script>

<template>
    <div class='best_phase' v-if="store.site.best_visibility">
        <header class='subtitle'>FIND IT</header>
        <div class='description'>
        <p>{{store.site.best_visibility}}</p>
        </div>
    </div>
</template>