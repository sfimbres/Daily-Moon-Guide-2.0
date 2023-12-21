<script setup>
import { store, appProps } from '../../store';
import TagSvg from '../svg/TagSvg.vue';
import { selectSite } from '../../helpers/functions';
const props = defineProps(['i', 'v','key']);
</script>

<template>
    <div :key="`site_${i}`" class="icon_button" :class="`tag_${i} ${store.active_tags.indexOf(v) > -1 ? 'current': ''}`" @click="() => {selectSite(v)}">
        <div class='icon tag'><TagSvg :i="i"/></div>
        <div class='text'>{{v}}</div>
    </div>
</template>