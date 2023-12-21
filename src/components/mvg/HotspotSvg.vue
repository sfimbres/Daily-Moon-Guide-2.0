<script setup>
import { store } from '../../store/index.js'
import TagSvg from '../svg/TagSvg.vue';
const props = defineProps(['tag']);
const {tags} = store;
let idx;

if(props.tag){
    idx = tags.indexOf(props.tag)
}

</script>

<template>
    <TagSvg v-if="tag" :i="idx+1"/>
    <TagSvg v-else :i="3"/>
</template>