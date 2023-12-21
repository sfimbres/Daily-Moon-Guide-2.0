<script setup>
import MoonPhaseSvg from './MoonPhaseSvg.vue';
const props = defineProps(['day', 'select', 'key' ]);
const { day, select } = props;
</script>

<template>
    <div :class='"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.has_event ? " selected" : "")' @click="()=>{ select(day.date.toDate())}">
    		<span :class='`date ${day.moon_phase ? "phase_date" : ""}`'>{{day.number}}</span> 
            <div class="phase_wrapper" v-if="day.moon_phase">
                <MoonPhaseSvg :moon_phase="day.moon_phase"/>
            </div>
    </div>
</template>