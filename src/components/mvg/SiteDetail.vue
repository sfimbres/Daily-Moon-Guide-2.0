<script setup>
import { store } from '../../store/index.js';
import SiteFigure from './SiteFigure.vue';
import BestPhase from './BestPhase.vue';
import ViewTypeIcons from './ViewTypeIcons.vue';
</script>

<template>
    <div class='detail_content site' v-if="store.site">
        <SiteFigure />
        <div class='body'>
            <h1 class='title'>{{ store.site.title }}</h1>
            <div class='description'>
                <p v-html="store.site.description"></p>
            </div>
        </div>
        <BestPhase />
        <div class='view_with'>
            <header class='subtitle'>VIEW WITH</header>
            <div class='view_type_wrapper'>
                <ViewTypeIcons :view_cat="store.site.view_category"/>
            </div>
        </div>
    </div>
</template>