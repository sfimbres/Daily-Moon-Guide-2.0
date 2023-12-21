<script setup>
import { store } from '../../store/index.js';
import RightArrowSvg from '../svg/RightArrowSvg.vue';
import XSvg from '../svg/XSvg.vue';
import GetDetail from './GetDetail.vue';
import { closeDetail } from '../../helpers/functions';

</script>

<template>
    <div class='detail_inner_wrapper' v-if="store.detail_open">
        <div class='detail_close arrow' @click="e => { closeDetail() }">
            <div class='icon_wrapper'>
                <RightArrowSvg />
            </div>
        </div>
        <div class='detail_close x' @click="e => { closeDetail() }">
            <div class='icon_wrapper'>
                <XSvg />
            </div>
        </div>
        <GetDetail />
    </div>
</template>