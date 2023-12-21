<script setup>
import { store } from '../../store/index.js';
import BinocularsSvg from '../svg/BinocularsSvg.vue';
import NakedEyeSvg from '../svg/NakedEyeSvg.vue';
import TelescopeSvg from '../svg/TelescopeSvg.vue';
</script>

<template>
<NakedEyeSvg v-if="store.filters == 0"/>
<BinocularsSvg v-else-if="store.filters == 1"/>
<TelescopeSvg v-else-if="store.filters == 2"/>
</template>