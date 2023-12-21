<script setup>
import { ref } from 'vue';
const props = defineProps(['files', 'poster', 'autostart', 'vrview', 'controls']);

const isClicked = ref(false);
const video_ref = ref(null);

function onVideoClick(){
    isClicked.value = true;
}
</script>

<template>
    <figure>
        <div id="video_84869" class="video_container">
            <div class="play_overlay" v-if="!isClicked" @click="() => onVideoClick()">
                <div class="svg_icon_container"><svg id="play_circle" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r="36" fill="#fff"></circle>
                        <path d="M26,50V22L50,36Z"></path>
                    </svg></div>
            </div>
            <video preload="auto" :poster="poster" :controls="isClicked" autoplay @click="() => onVideoClick()" ref="video_ref">
                <source src="/src/assets/video/moon_phases_2023.mp4" type="video/mp4">Your browser does not support the video tag. 
            </video>
        </div>
    </figure>
</template>

<style scoped>
.video_container {
    font-size: 16px;
    position: relative;
    display: block;
    min-height: 0;
    overflow: hidden;
    box-sizing: border-box;
    font-family: Arial,Helvetica,sans-serif;
    background-color: #000;
}
</style>