<script setup>
import { store } from '../../store/index.js';
import ZoomSvg from '../svg/ZoomSvg.vue';
import { zoomMap } from '../../helpers/functions'
const props = defineProps(['is_mobile', 'toolbar']);

let view_frame = (props.is_mobile) ? store.mobile_view_frame_open : store.desktop_view_frame_open;
let more_options = (props.is_mobile) ? `${store.more_options_open ? 'more_options_open' : ''}` : '';
</script>

<template>
    <div class="zoom_map_toggle" :class="`${view_frame ? 'open' : ''} ${more_options} ${store.zoomed ? 'zoomed' : ''}`">
        <div class="icon_button zoom_map" @click="() => zoomMap(store.zoomed)">
            <div class='icon'>
                <ZoomSvg v-if="!store.zoomed"/>
            </div>
            <div class='text' :style="{ display: (store.zoomed && toolbar ? 'block' : 'none' ) }">{{store.zoomed ? 'EXIT ZOOM' : 'ZOOM MAP'}}</div>
        </div>
    </div>
</template>

<style lang="scss">
 .main-window .zoom_map_toggle {
    position: absolute;
    margin: 32px;
    top: 18%;
    left: 0;
}

.main-window .zoom_map_toggle .icon_button .text {
    display: none;
}

.zoomed .toolbar .zoom_map_toggle .icon_button {
    padding: 14px 0 9px;
}

.toolbar .icon_button {
    text-align: center;
    padding: 1rem 0;
}

@media (min-width: 600px){
    .zoom_map_toggle {
    display: none;
    }
}

</style>