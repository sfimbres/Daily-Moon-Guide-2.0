<script setup>
import { appProps, store } from '../../store/index.js';
import ViewFrameToggleButton from './ViewFrameToggleButton.vue';
import ZoomMapToggleButton from './ZoomMapToggleButton.vue';
import MobileViewFrame from './MobileViewFrame.vue'
import MoreOptionsHandle from './MoreOptionsHandle.vue';
import DateTodayContainer from './DateTodayContainer.vue';
import CalendarSvg from '../svg/CalendarSvg.vue';
import GetCalendar from './GetCalendar.vue'
import SpecialEventsSvg from '../svg/SpecialEventsSvg.vue';
import EventsMenu from './EventsMenu.vue';
import { toggleMoreOptions, closeCalendar, openCalendar, closeEventsMenu, openEventsMenu } from '../../helpers/functions';
</script>

<template v-if="!store.detail_open">
    <div class="toolbar" v-if="appProps.single_day">
        <div class='tap_for_more_panel'>
            <ZoomMapToggleButton :is_mobile="true" />
            <ViewFrameToggleButton />
            <MobileViewFrame />
        </div>
    </div>

    <div class="toolbar" v-else>
        <div :class="`toolbar_inner_wrapper ${store.more_options_open ? 'more_options_open' : ''}`">
            <div class="more_options_toggle" @click="(e) => toggleMoreOptions(e)">
                <MoreOptionsHandle />
            </div>
            <DateTodayContainer />
            <div class="tap_for_more_panel">
                <div class='calendar_select_container'>
                    <div class='icon_button calendar' @click="() => {store.calendar_open ? closeCalendar() : openCalendar()}">
                        <div :class="`icon ${store.calendar_open ? 'icon_active' : ''}`">
                        <CalendarSvg />
                        </div>
                        <div class='text'>All Dates</div>
                    </div>
                    <GetCalendar />
                    <div class='popover_menu_arrow calendar_arrow'></div>
                </div>
                <DateTodayContainer />
                <div class='events_select_container'>
                    <div class='icon_button events' @click="() => {store.events_menu_open ? closeEventsMenu() : openEventsMenu()}">
                        <div :class="`icon ${store.events_menu_open ? 'icon_active' : ''}`">
                            <SpecialEventsSvg />
                        </div>
                        <div class='text'>Special Events</div>
                    </div>
                    <EventsMenu />
                    <div class='popover_menu_arrow events_arrow right'></div>
                </div>
                <ViewFrameToggleButton />
                <MobileViewFrame />
            </div>
        </div>
        <ZoomMapToggleButton :is_mobile="true" :toolbar="true"/>
    </div>
</template>