<script setup>
import { appProps } from '../../store/index.js';
import { closeEventsMenu, gotoEventDate, formatEventDate } from '../../helpers/functions';

const events = appProps.events || [];
</script>

<template>
    <div class="popover_menu events_menu">
        <div class="popover_inner_wrapper events_menu_container">
            <div class="close" @click="e => {closeEventsMenu()}">
            <div class="icon">✕</div>
            </div>
            <ul class="events_list item_list">
                <li class='event list_item' v-for="i in events.length" :key="i" @click="v => {gotoEventDate(events[i-1])}">
                    <div class='special_event_date'>{{formatEventDate(events[i-1])}}</div>
                    <div class='special_event_title'>{{events[i-1].title}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>