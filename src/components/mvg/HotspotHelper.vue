<script setup>
import { reactive, watch } from 'vue';
import { store, appProps } from '../../store/index.js';
import HotspotSvg from './HotspotSvg.vue'
import { getDayOfYear, openSiteDetail, getHotspotPositions } from '../../helpers/functions';

const props = defineProps(['v', 'i', 'key'])

let doy = getDayOfYear(store.date);
let positions = getHotspotPositions(props.v.formal_name)
let uv;

if(positions){
    uv = positions.pos[doy - 1]
} else {
    uv = {u: props.v.x / 100, v: props.v.y / 100}
}

let should_display = true
if(store.detail_type === "site" && store.detail_open && store.site){
    should_display = store.site.formal_name == props.v.formal_name
} else if (store.detail_type === "phase" || store.detail_type === "event") {
    should_display = false;
}

watch(() => store.date, (newDate) => {
    doy = getDayOfYear(newDate)
    uv = positions.pos[doy - 1];
    styleObject.top = `${uv.v * 100}%`;
    styleObject.left = `${uv.u * 100}%`;
})

watch(() => store.detail_open, (detail_open) => {
    if(detail_open){
        if(store.detail_type === "site" && detail_open && store.site){
            styleObject.display = store.site.formal_name == props.v.formal_name ? 'flex' : 'none'
        } else if (store.detail_type === "phase" || store.detail_type === "event") {
        styleObject.display = 'none';
        } 
    } else {
            styleObject.display = 'flex';
    } 
})

const styleObject = reactive({
    top: `${uv.v * 100}%`,
    left: `${uv.u * 100}%`,
    display: should_display ? 'flex' : 'none',
})

</script>

<template>
    <div class='sitespot' :style="styleObject" @click="e => {openSiteDetail(v)}">
        <div :class="`icon ${appProps.single_day ? 'tag' : ''}`">
            <HotspotSvg v-if="appProps.single_day" :tag="v.tag_list[0]"/>
            <HotspotSvg v-else />
        </div>
        <div class='text'>{{v.title}}</div>
    </div>
</template>

