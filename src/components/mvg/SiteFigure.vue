<script setup>
import { store } from '../../store/index.js';
import SiteFigureImageForSwitchbox from './SiteFigureImageForSwitchbox.vue'
import SiteFigureCaptionForSwitchbox from './SiteFigureCaptionForSwitchbox.vue'
import GetFigure from './GetFigure.vue';
import { toggleSwitchbox, getDescriptionCredit } from '../../helpers/functions';

let satellite_img_scr = store.site.satellite_src;
let terrestrial_img_scr = store.site.terrestrial_src;
let sat_cap = getDescriptionCredit(store.site.satellite_caption, store.site.satellite_credit)
let ter_cap = getDescriptionCredit(store.site.terrestrial_caption, store.site.terrestrial_credit)
let switchbox_title_left;
let switchbox_title_right;

if (satellite_img_scr && terrestrial_img_scr) {
      switchbox_title_left = store.site.satellite_button_text ? store.site.satellite_button_text : 'Overview image';
      switchbox_title_right = store.terrestrial_button_text ? store.terrestrial_button_text : 'Detail image';
}

</script>

<template>
    <template v-if="satellite_img_scr && terrestrial_img_scr">
        <figure class='detail_figure'>
            <SiteFigureImageForSwitchbox :src_1="satellite_img_scr" :src_2="terrestrial_img_scr" :cap_1="sat_cap" :cap_2="ter_cap"/>
            <div class="switchbox_container">
            <form class="switchbox">
                <input type="radio" id='site_switch_lt' data-figure="0" class="switch_input" :class="`${(parseInt(store.current_site_detail_figure) === 0) ? 'selected' : ''}`" :value="switchbox_title_left" @click="(e) => {toggleSwitchbox(e)}" :checked="store.current_site_detail_figure == 0 ? true : false" />
                <label htmlFor='site_switch_lt' class="switch_label switch_label_left">{{switchbox_title_left}}</label>
                <input type="radio" id='site_switch_rt' data-figure="1" class="switch_input" :class="`${ (parseInt(store.current_site_detail_figure) === 1) ? 'selected' : ''}`" :value="switchbox_title_right" @click="(e) => {toggleSwitchbox(e)}" :checked="store.current_site_detail_figure == 1 ? true : false" />
                <label htmlFor='site_switch_rt' class="switch_label switch_label_right">{{switchbox_title_right}}</label>
            </form>
            </div>
            <SiteFigureCaptionForSwitchbox :caption_1="sat_cap" :caption_2="ter_cap"/>
        </figure>
    </template>

    <template v-else-if="satellite_img_scr">
        <GetFigure :img_src="satellite_img_scr" :img_caption="sat_cap"/>
    </template>

    <template v-else-if="terrestrial_img_scr">
        <GetFigure :img_src="terrestrial_img_scr" :img_caption="ter_cap"/>
    </template>
</template>