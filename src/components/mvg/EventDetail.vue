<script setup>
import { store } from '../../store/index.js';
import GetFigure from './GetFigure.vue';

const props = defineProps(['phase']);

const special_event = props.phase ? store.moon_phase : store.special_event
</script>

<template>
    <div class='detail_content event' v-if="special_event">
        <GetFigure :img_src="special_event.list_image_src" :img_caption="special_event.caption"/>
        <div class='body'>
            <h1 class='title'>{{ special_event.title }}</h1>
            <div class='description' v-html="special_event.body"></div>
            <a :href="special_event.link" class='more_link' v-if="special_event.link && special_event.link_text">{{`${special_event.link_text} ›`}}</a>
        </div>
    </div>
</template>