<script setup>
const props = defineProps(['moon_phase']);
</script>

<template>
    <svg class="full_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-if="moon_phase == 'new_moon'">
            <rect fill="none" width="30" height="30"/>
            <circle fill="#474747" cx="15" cy="15" r="15"/>
    </svg>

    <svg class="full_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase == 'full_moon'">
        <rect fill="none" width="30" height="30"/>
        <circle fill="#A6C6E8" cx="15" cy="15" r="15"/>
    </svg>

    <svg class="first_quarter_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase == 'first_quarter_moon'">
        <rect fill="none" width="30" height="30"/>
        <ellipse fill="#A6C6E8" cx="15.34" cy="15" rx="14.66" ry="15"/>
        <path fill="#474747" d="M14.66,30A14.83,14.83,0,0,1,0,15,14.83,14.83,0,0,1,14.66,0"/>
    </svg>

    <svg class="third_quarter_moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" v-else-if="moon_phase == 'third_quarter_moon'">
        <rect fill="none" width="30" height="30"/>
        <ellipse fill="#A6C6E8" cx="14.66" cy="15" rx="14.66" ry="15"/>
        <path fill="#474747" d="M15.34,30A14.83,14.83,0,0,0,30,15,14.83,14.83,0,0,0,15.34,0"/>
    </svg>

    <div v-else>{{ console.log("------cannot get moon phase for : " + moon_phase) }}</div>
</template>