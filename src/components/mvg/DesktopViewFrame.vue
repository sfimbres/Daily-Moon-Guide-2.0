<script setup>
import { store } from '../../store/index.js';
import { view_frame_wrapper_ref, view_frame_toggle_ref } from '../../store/index.js';
import ViewControls from './ViewControls.vue';
import YourViewIcon from './YourViewIcon.vue';
import { closeDesktopViewFrame, openDesktopViewFrame } from '../../helpers/functions';
</script>

<template>
    <div class="view_frame_wrapper" :class='`${store.desktop_view_frame_open ? "open" : ""}`' ref="view_frame_wrapper_ref">
        <div class='close' @click="() => {closeDesktopViewFrame()}">
            <div class="icon">✕</div>
        </div>
        <ViewControls v-if="store.desktop_view_frame_open"/>
        <div class="view_frame_toggle open" ref="view_frame_toggle_ref">
        <div class='icon_button your_view' @click="() => {openDesktopViewFrame()}">
            <div class='icon'>
                <YourViewIcon />
            </div>
            <div class='text'>Your View</div>
        </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.view_frame_wrapper {
    color: #A5B4CF;
    display: none;
    position: absolute;
    height: auto;
    width: 174px;
    background-color: #1C2027;
    padding: 31px 17px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 700;
    overflow-y: auto;
    scrollbar-color: #78CBFF #1a3055;
    scrollbar-width: thin;
    bottom: 84px;
    max-height: calc(100% - 166px);
}
.view_frame_wrapper .close {
    position: absolute;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
    right: 0;
    top: 0;
    padding: 11px;
    cursor: pointer;
    transition: opacity 125ms ease-out;
}

.view_frame_toggle.open {
    opacity: 0;
    pointer-events: none;
    transition: opacity 125ms ease-out;
}
.view_frame_toggle {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 58px;
    background-color: #ffffff00;
    border-radius: 2px 0 0 2px;
    transition: background-color 200ms ease-out, opacity 125ms ease-out;
}
.view_frame_toggle .icon_button {
    color: #0E0E22;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 6px 0 7px 0;
}
.view_frame_toggle .icon_button .icon {
    width: 24px;
    height: 24px;
}

.view_frame_toggle .icon_button .text {
    margin-top: 6px;
    text-align: center;
    font-family: Metropolis,Helvetica,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.071;
    text-transform: uppercase;
}

@media (min-width: 769px){
    .view_frame_wrapper {
        bottom: 160px;
    }
}

@media (min-width: 600px){
    .view_frame_wrapper {
        display: block;
    }

    .view_frame_wrapper.open .close {
        opacity: 1;
    }
}

</style>