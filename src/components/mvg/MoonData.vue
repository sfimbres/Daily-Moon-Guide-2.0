<script setup>
import { appProps, store } from '../../store/index.js';
import MoonPhasesSvg from '../svg/MoonPhasesSvg.vue';
import ChevronSvg from '../svg/ChevronSvg.vue';
import DistanceFromEarthSvg from '../svg/DistanceFromEarthSvg.vue';
import AngularDiameterSvg from '../svg/AngularDiameterSvg.vue';
import GetPromo from '../mvg/GetPromo.vue'
import { changeUnits, convertUnits, expandData } from '../../helpers/functions';
</script>

<template>
    <div class='moon_data_container'>
        <div class='moon_data'>
            <div class='col'>
                <div class='fact'>
                    <div class='category_title'>CURRENT PHASE</div>
                    <div class="expand_row" :class="store.expanded_data.indexOf(0) > -1 ? 'expanded' : ''">
                        <div class='expand_row_top'>
                            <div class='icon_and_title_wrapper'>
                                <div class='icon'>
                                    <MoonPhasesSvg :moon_phase="store.moon_data.phase_name" />
                                </div>
                                <div class='title'>{{Math.round(store.moon_data.phase)}}% - Day {{Math.round(store.moon_data.age)}}</div>
                            </div>
                            <div class='expand_btn' @click="v => {expandData(0)}">
                                <ChevronSvg />
                            </div>
                        </div>
                        <div class='description'>{{appProps.data_descriptions[0]}}</div>
                    </div>
                </div>
                <div class='fact'>
                    <div class='category_title'>DISTANCE FROM EARTH</div>
                    <div class="expand_row" :class="store.expanded_data.indexOf(1) > -1? 'expanded' : ''">
                        <div class='expand_row_top'>
                            <div class='icon_and_title_wrapper'>
                                <div class='icon earth_distance'>
                                    <DistanceFromEarthSvg />
                                </div>
                            <div class='title distance_fact'>{{convertUnits(store.moon_data.distance).toLocaleString()}}</div>
                            <div class="mi_km_toggle switchbox_container">
                                <form class="switchbox">
                                    <input type="radio" id='unit_switch_lt' data-figure="0" class="switch_input" :class="store.units === 'mi' ? 'selected' : ''" value='mi' @change="e => {changeUnits(e)}" :checked="store.units === 'mi'"/>
                                    <label htmlFor='unit_switch_lt' class="switch_label switch_label_left">mi</label>
                                    <input type="radio" id='unit_switch_rt' data-figure="1" class="switch_input" :class="store.units === 'km' ? 'selected' : ''" value='km' @change="e => {changeUnits(e)}" :checked="store.units === 'km'"/>
                                    <label htmlFor='unit_switch_rt' class="switch_label switch_label_right">km</label>
                                </form>
                            </div>
                            </div>
                            <div class='expand_btn' @click="v => {expandData(1)}"> 
                                <ChevronSvg />
                            </div>
                        </div>
                        <div class='description'>{{appProps.data_descriptions[1]}}</div>
                    </div>
                </div>
                <div class='fact'>
                    <div class='category_title'>ANGULAR DIAMETER</div>
                    <div class="expand_row" :class="store.expanded_data.indexOf(2) > -1 ? 'expanded' : ''">
                        <div class='expand_row_top'>
                            <div class='icon_and_title_wrapper'>
                                <div class='icon angular_diameter'>
                                    <AngularDiameterSvg />
                                </div>
                                <div class='title'>{{store.moon_data.diameter}} arcseconds</div>
                            </div>
                            <div class='expand_btn' @click="v => {expandData(2)}">
                                <ChevronSvg />
                            </div>
                        </div>
                        <div class='description'>{{appProps.data_descriptions[2]}}</div>
                    </div>
                </div>
            </div>
            <div class='col'>
                <GetPromo v-if="appProps.promo"/>
            </div>
        </div>
    </div>
</template>