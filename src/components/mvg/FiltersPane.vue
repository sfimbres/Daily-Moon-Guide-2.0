<script setup>
import { store, appProps } from '../../store';
import TagSvg from '../svg/TagSvg.vue';
import NakedEyeSvg from '../svg/NakedEyeSvg.vue';
import BinocularsSvg from '../svg/BinocularsSvg.vue';
import TelescopeSvg from '../svg/TelescopeSvg.vue';
import TagSelect from '../mvg/TagSelect.vue'
import { selectAllSights, toggleFilter } from '../../helpers/functions';

const single_day = appProps.single_day;
const props = defineProps(['filter_pane_title'])
</script>

<template>
    <div class='pane filters' v-if="single_day">
        <div class='pane_title'>SITES</div>
        <div class="filters_wrapper">
            <div key="site_0" class="icon_button tag_all" :class="store.active_tags.length == 0 ? 'current': ''" @click="() => {selectAllSights()}">
                <div class="icon tag"><TagSvg i="0" /></div>
                <div class='text'>View all</div>
            </div>
            <TagSelect v-for="(item, index) in store.tags" :v="item" :i="index" :key="index"/>
        </div>
    </div>

    <div class='pane filters' v-else>
        <div class='pane_title' v-if="filter_pane_title">{{filter_pane_title}}</div>
        <div class="filters_wrapper">
        <div class="icon_button eye" :class="store.filters == 0 ? 'current': ''" @click="() => {toggleFilter(0)}">
            <div class='icon'><NakedEyeSvg /> </div>
            <div class="text">Unaided Eye</div>
        </div>
        <div class="icon_button binoculars" :class="store.filters == 1 ? 'current': ''" @click="() => {toggleFilter(1)}">
            <div class='icon'><BinocularsSvg /></div>
            <div class='text'>Binoculars</div>
        </div>
        <div class="icon_button telescope" :class="store.filters == 2 ? 'current': ''" @click="() => {toggleFilter(2)}">
            <div class='icon'><TelescopeSvg /></div>
            <div class='text'>Telescope</div>
        </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pane.filters {
    padding-bottom: 4px;
}

.pane.filters .pane_title {
    margin-bottom: 10px;
}

.filters_wrapper {
    flex-direction: column;
}

.filters_wrapper .icon_button {
    flex-direction: row;
    margin-bottom: 18px;
}

.filters_wrapper .icon_button .icon {
    width: 24px;
    height: 24px;
    margin-right: 16px;
}
</style>

<style>
.mvg_onboard_modal .icon {
    margin-right: 0px!important;
}
</style>