<script setup>
import Calendar from '../calendar/Calendar.vue';
import { selectDay, closeCalendar } from '../../helpers/functions';
</script>

<template v-if="!appProps.single_day">
    <div class='popover_menu calendar'>
        <div class='popover_inner_wrapper calendar_container'>
        <div class="close" @click="e => {closeCalendar()}">
            <div class="icon">✕</div>
        </div>
        <Calendar :select="e => {selectDay(e)}" />
        <div class='calendar_est'>Calendar uses Coordinated Universal Time</div>
        </div>
    </div>
</template>

<style lang="scss">

.toolbar .popover_menu {
    display: none;
    position: absolute;
    border-radius: 5px;
    width: calc(100% - 12px);
    margin: auto;
    background: linear-gradient(#0B1932, #0e3366);
    border-top: 9px solid #0B1932;
    border-bottom: 9px solid #0e3366;
    z-index: 1;
    bottom: 0;
    opacity: 0;
    transition: bottom 500ms ease-in-out, opacity 500ms ease-in-out;
}

.toolbar .popover_menu .popover_inner_wrapper::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.toolbar .popover_menu .popover_inner_wrapper::-webkit-scrollbar-thumb {
    background-color: #78CBFF;
}

.toolbar .popover_menu .popover_inner_wrapper::-webkit-scrollbar-track {
    background-color: #1a3055;
}
</style>