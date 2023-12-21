<script setup>
const props = defineProps(['moon_phase']);
</script>

<template>
    <svg class="moon_icon full_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-if="moon_phase === 'New'">
        <rect fill="none" width="30" height="30"/>
        <circle fill="#474747" cx="15" cy="15" r="15"/>
    </svg>

    <svg class="moon_icon full_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase === 'Full'">
        <rect fill="none" width="30" height="30"/>
        <circle fill="#A6C6E8" cx="15" cy="15" r="15"/>
    </svg>

    <svg class="moon_icon first_quarter_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase === 'First Quarter'">
        <rect fill="none" width="30" height="30"/>
        <ellipse fill="#A6C6E8" cx="15.34" cy="15" rx="14.66" ry="15"/>
        <path fill="#474747" d="M14.66,30A14.83,14.83,0,0,1,0,15,14.83,14.83,0,0,1,14.66,0"/>
    </svg>

    <svg class="moon_icon last_quarter_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase === 'Last Quarter'">
        <rect fill="none" width="30" height="30"/>
        <ellipse fill="#A6C6E8" cx="14.66" cy="15" rx="14.66" ry="15"/>
        <path fill="#474747" d="M15.34,30A14.83,14.83,0,0,0,30,15,14.83,14.83,0,0,0,15.34,0"/>
    </svg>

    <svg class="moon_icon waxing_crescent_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase === 'Waxing Crescent'">
        <rect fill="none" width="30" height="30"/>
        <ellipse fill="#474747" cx="14.66" cy="14.99" rx="14.66" ry="14.99"/>
        <path fill="#A6C6E8" d="M15.34,29.98C22.86,30.46,30,23.27,30,14.99S23.44,0,15.34,0c0.03,0,11.1,2.83,10.55,15C25.35,27.17,13.07,29.98,15.34,29.98z"/>
    </svg>

    <svg class="moon_icon waning_crescent_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase === 'Waning Crescent'">
        <rect fill="none" width="30" height="30"/>
        <ellipse fill="#474747" cx="15.34" cy="14.99" rx="14.66" ry="14.99"/>
        <path fill="#A6C6E8" d="M14.66,29.98C7.14,30.46,0,23.27,0,14.99S6.56,0,14.66,0C14.62,0,3.56,2.83,4.11,15C4.65,27.17,16.93,29.98,14.66,29.98z"/>
    </svg>

    <svg class="moon_icon waning_gibbous_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase === 'Waning Gibbous'">
        <rect fill="none" width="30" height="30"/>
        <ellipse fill="#A6C6E8" cx="14.66" cy="14.99" rx="14.66" ry="14.99"/>
        <path fill="#474747" d="M15.34,29.98C22.86,30.46,30,23.27,30,14.99S23.44,0,15.34,0c0.03,0,11.1,2.83,10.55,15C25.35,27.17,13.07,29.98,15.34,29.98z"/>
    </svg>

    <svg class="moon_icon waxing_gibbous_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase === 'Waxing Gibbous'">
        <rect fill="none" width="30" height="30"/>
        <ellipse fill="#A6C6E8" cx="15.34" cy="14.99" rx="14.66" ry="14.99"/>
        <path fill="#474747" d="M14.66,29.98C7.14,30.46,0,23.27,0,14.99S6.56,0,14.66,0C14.62,0,3.56,2.83,4.11,15C4.65,27.17,16.93,29.98,14.66,29.98z"/>
    </svg>

    <div v-else>{{ console.log("------cannot get moon phase for : " + moon_phase) }}</div>
</template>