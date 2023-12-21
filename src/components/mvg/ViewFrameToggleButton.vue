<script setup>
import { store } from '../../store/index.js';
import YourViewIcon from './YourViewIcon.vue';
import { openMobileViewFrame } from '../../helpers/functions';
let more_options = `${store.more_options_open ? 'more_options_open' : ''}`;
</script>

<template>
    <div class="view_frame_toggle" :class="`${store.mobile_view_frame_open ? 'open' : ''} ${more_options} ${store.zoomed ? 'zoomed' : ''}`">
        <div class='icon_button your_view' @click="() => {openMobileViewFrame()}">
          <div class='icon'>
            <YourViewIcon />
          </div>
          <div class='text'>YOUR VIEW</div>
        </div>
      </div>
</template>