<script setup>
import { store, appProps } from '../../store/index.js';
import INOMNBrandLogoIcon from './INOMNBrandLogoIcon.vue';
import PlusSvg from '../svg/PlusSvg.vue';
import { openEventDetail, openPhaseDetail} from '../../helpers/functions'; 

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
</script>

<template>
    <div class='detail_selector' v-if="appProps.single_day">
        <INOMNBrandLogoIcon />
        <div class='title_container'>
        <h3 class='category_title'>OFFICIAL MOON MAP</h3>
        <h2 class='media_feature_title'>{{`${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`}}</h2>
        </div>
    </div>

    <div class='detail_selector' v-else-if="store.special_event">
        <h3 class='category_title'>SPECIAL EVENT</h3>
        <h2 class='media_feature_title' @click="e => {openEventDetail()}" aria-label='open detail panel'>{{store.special_event ? store.special_event.title : null}}
        <span class='occasional_button icon no_wrap'>&nbsp;<PlusSvg /></span>
        </h2>
        <div class='occasional_button button' @click="e => {openEventDetail()}">
        DETAILS
        </div>
    </div>

    <div class='detail_selector' v-else>
        <h3 class='category_title'>MOON PHASE</h3>
        <h2 class='media_feature_title' @click="e => {openPhaseDetail()}" aria-label='open detail panel'>{{store.moon_phase ? store.moon_phase.title : null}}
        <span class='occasional_button icon no_wrap' >&nbsp;<PlusSvg /></span>
        </h2>
        <div class='occasional_button button' @click="e => {openPhaseDetail()}">
        DETAILS
        </div>
    </div>
</template>

<style lang="scss" scoped>
    h2 {
        font-size: 1.8em;
    }

    .button, .outline_button, .primary_media_feature .floating_text_area .button, .banner_header_overlay .button {
        font-weight: 700;
        display: inline-block;
        margin-bottom: 0.5em;
        margin-left: auto;
        margin-right: auto;
        background-color: #4583C0;
        color: white;
        line-height: 1em;
        border: 0;
        text-decoration: none;
        border-radius: 4px;
        cursor: pointer;
        text-shadow: none;
        font-size: 13px;
        padding: 12px 24px;
        text-transform: uppercase;
        white-space: nowrap;
    }

</style>