<script setup>
import { store } from '../../store/index.js';
import SiteDetail from './SiteDetail.vue';
import EventDetail from './EventDetail.vue';

</script>

<template>
    <SiteDetail v-if="store.detail_type === 'site'"/>
    <EventDetail v-else-if="store.detail_type === 'phase'" :phase="true"/>
    <EventDetail v-else-if="store.detail_type === 'event'" :phase="false"/>
</template>