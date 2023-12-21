<script setup>
import { store } from '../../store/index.js';
import FiltersPane from './FiltersPane.vue';
import HemisphereSvg from '../svg/HemisphereSvg.vue';
import HemisphereTriangleSvg from '../svg/HemisphereTriangleSvg.vue';
import { changeSights, changeHemisphere, openFaq  } from '../../helpers/functions';
</script>

<template>
    <div class='view_frame'>
        <FiltersPane filter_pane_title="OBSERVING WITH"/>
        <div class='pane sights'>
            <div class='pane_title'>SITES</div>
            <div class="sights_select switchbox_container">
            <select @change="e => {changeSights(e)}" :value="store.sights">
                <option value='recommended'>Recommended</option>
                <option value='all' v-if="$window.innerWidth > 600">View All</option>
                <option value='none'>Hide All</option>
            </select>
            </div>
        </div>
        <div class='pane hemisphere'>
            <div class='pane_title'>YOUR HEMISPHERE</div>
            <div class='hemisphere_buttons'>
            <div class="icon_button north" :class="store.hemisphere === 'north' ? 'current' : ''" @click="e => {changeHemisphere('north')}">
                <div class='icon indicator'>
                    <HemisphereTriangleSvg />
                </div>
                <div class='icon hemisphere'>
                    <HemisphereSvg />
                </div>
            </div>
            <div class="icon_button south" :class="store.hemisphere === 'south' ? 'current' : ''"  @click="e => {changeHemisphere('south')}">
                <div class='icon indicator'>
                    <HemisphereTriangleSvg />
                </div>
                <div class='icon hemisphere'>
                    <HemisphereSvg />
                </div>
            </div>
            </div>
        </div>
        <div class='pane faq'>
            <div class='faq_wrapper' @click="() => {openFaq()}"><div class='question icon'>?</div><div class='text'>FAQ</div></div>
        </div>
    </div>
</template>

<style lang="scss" scoped >
.view_frame {
    opacity: 0;
    transition: opacity 125ms ease-out;
}
.pane.sights {
    padding: 18px 0 20px;
}
.pane.sights .pane_title {
    margin-bottom: 6px;
}

.sights_select {
    margin: 0 auto;
}

.sights_select select {
    position: relative;
    padding: 0.5em 2em 0.5em 1em;
    font-size: 16px;
    border: 0;
    height: 40px;
    vertical-align: middle;
    color: white;
    -webkit-appearance: none;
    appearance: none;
    -o-appearance: none;
    -moz-appearance: none;
    //background: #303743 url(/assets/arrows_select_box@2x.png) no-repeat 95% 10px;
    background-position: right 0.8em top 10px;
    background-size: 9px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
    max-width: 304px;
    height: 29px;
    background: #303743 url(/src/assets/images/chevron_dn.png) no-repeat 92% 10px;
    background-size: 10px 10px;
    font-size: 12px;
    font-weight: 600;
}

.pane.hemisphere {
    padding-top: 18px;
}

.pane.hemisphere .pane_title {
    margin-bottom: 22px;
}

.hemisphere_buttons {
    flex-direction: column;
}

.hemisphere_buttons .icon_button {
    margin-bottom: 20px;
}

.hemisphere_buttons .icon_button .icon.hemisphere {
    margin-right: 18px;
}

.pane_title {
    text-align: left;
}

.pane.faq {
    padding-top: 16px;
}
.faq .question {
    display: none;
}
.faq .question {
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background-color: #253E62;
    margin-right: 8px;
    text-align: center;
}

@media (min-width: 600px){
    .view_frame {
        opacity: 1;
    }
}
</style>

<style>
.toolbar .view_frame {
    opacity: 1;
    transition: opacity 125ms ease-out;
}

.toolbar .view_frame_wrapper .pane_title {
    text-align: center;
}

.toolbar .view_frame_wrapper .hemisphere_buttons {
    flex-direction: row;
}

.toolbar .view_frame_wrapper .hemisphere_buttons .icon_button {
    flex-direction: column;
    padding: 0;
}

.toolbar .hemisphere_buttons .icon_button .icon.hemisphere {
    margin-right: 0;
}

.toolbar .faq .question {
    display: block;
}

.toolbar .hemisphere_buttons .icon_button {
    margin-bottom: 0px;
}

.toolbar .filters_wrapper .icon_button .icon {
    margin-right: 0px;
}
</style>