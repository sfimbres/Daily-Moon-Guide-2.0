<script setup>
import { appProps } from '../../store/index.js';
import PromoVideo from './PromoVideo.vue';

var files = []
const {promo} = appProps;

if(promo.webm_video_src){
    files.push({file: promo.webm_video_src})
}
if(promo.mp4_video_src){
    files.push({file: promo.mp4_video_src})
}
if(promo.ogv_video_src){
    files.push({file: promo.ogv_video_src})
}
</script>

<template>
   <div class='promo'>
        <div class='video_container'>
            <div class='video_player_container' id="moon_promo">
            <PromoVideo :poster="promo.image_src ? promo.image_src : ''"  />
            </div>
        </div>
        <header class='title' v-if="appProps.promo.title">{{appProps.promo.title}}</header>
        <div class='description' v-if="appProps.promo.body">{{appProps.promo.body}}</div>
        <a :href="'/src/assets/video/moon_phases_2023.mp4' || appProps.promo.more_link" class='more_link'>{{`${appProps.promo.more_link_text} ›`}}</a>
    </div>
</template>