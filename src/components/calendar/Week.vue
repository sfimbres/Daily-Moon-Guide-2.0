<script setup>
import Day from './Day.vue';
import moment from 'moment-timezone'
const props = defineProps(['key', 'date', 'month', 'select', 'events', 'phases']);

let days = [];
let { date, month, select } = props;

for (var i = 0; i < 7; i++) {
    let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        moon_phase: getPhase(date),
        has_event: hasEvent(date),
        date: date
    };
    days.push(day);

    date = date.clone();
    date.add(1, "day");
}

function hasEvent(date) {
    let has = false
    for (let i = 0; i < props.events.length; i++) {
        const event = props.events[i]
        let sd = moment(event.start_date)
        if (date.isSame(sd, "day")) {
            has = true
            break;
        }
    }
    return has;
}

function getPhase(date){
    let date_str = date.format('YYYY-MM-DD')
    return props.phases ? props.phases[date_str] : null
}
</script>

<template>
    <div class="row week">
		<Day :day="item" :key="`day_${item.number}`" :select="select" v-for="item in days" />
	</div>
</template>