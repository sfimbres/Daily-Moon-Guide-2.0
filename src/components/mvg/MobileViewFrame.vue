<script setup>
import ViewControls from './ViewControls.vue';
import { closeMobileViewFrame } from '../../helpers/functions';
</script>

<template>
    <div class='view_frame_wrapper'>
        <div class='close' @click="() => {closeMobileViewFrame()}">
        <div class='icon'>✕</div>
        </div>
        <ViewControls />
    </div>
</template>

