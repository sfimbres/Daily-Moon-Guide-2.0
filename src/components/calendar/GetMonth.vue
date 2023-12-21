<script setup>
import DayNames from './DayNames.vue';
import RenderMonthLabel from './RenderMonthLabel.vue';
import RenderWeeks from './RenderWeeks.vue';
const props = defineProps(['i', 'select']);
</script>

<template>
    <div class='month' :key="`month_${i}`">
        <header class="header">
            <div class="month-display row">
                <RenderMonthLabel :i="i" />
            </div>
            <DayNames />
        </header>
        <RenderWeeks :i="i" :select="select"/>
    </div>
</template>