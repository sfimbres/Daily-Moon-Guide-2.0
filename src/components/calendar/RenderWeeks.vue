<script setup>
import { appProps } from '../../store';
import moment from 'moment-timezone'
import Week from './Week.vue'
const props = defineProps(['i', 'select']);

let month = moment().set('month', props.i)
let phases = getMoonPhases(month.clone())
let weeks = [];
let done = false;
let date = month.clone().startOf("month").add("w" -1).day("Sunday");
let count = 0;
let monthIndex = date.month();

while (!done) {
    weeks.push({
        key: date,
        date: date.clone(),
        month: month.clone(),
        select: ((day) => { props.select(day) }),
        events: appProps.events,
        phases: phases
    });

    date.add(1, "w");
    done = count++ > 2 && monthIndex !== date.month();
    monthIndex = date.month();
}

function getMoonPhases(month) {
    const { moon_json } = appProps;
    let phases = []
    let currentDay = month.tz("America/New_York").startOf("month")
    const endDate = month.clone().endOf("month")
    let current_idx = currentDay.dayOfYear() - 1
    let last_phase = current_idx > 0 ? moon_json[current_idx - 1].phase_name : ""
    while (currentDay < endDate) {
        let phase = moon_json[current_idx].phase_name
        let p = getPhaseByVal(phase)
        if (p != "" && p != last_phase) {
            phases[currentDay.format('YYYY-MM-DD')] = getPhaseByVal(phase)
        }
        current_idx += 1
        currentDay.add(1, 'day')
    }
    return phases;
}

function getPhaseByVal(val) {
    switch (val) {
        case "New":
            return "new_moon";
        case "First Quarter":
            return "first_quarter_moon"
        case "Full":
            return "full_moon";
        case "Last Quarter":
            return "third_quarter_moon";
        default:
            // console.error("unexpected value for getPhaseByVal", val)
            return "";
    }
}
</script>

<template>
    <Week v-for="week in weeks" :key="week.key" :date="week.date" :month="week.month" :select="week.select" :events="week.events" :phases="week.phases"/>
</template>