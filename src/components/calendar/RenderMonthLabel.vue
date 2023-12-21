<script setup>
const props = defineProps(['i']);

const months = ['January 2023', 'February 2023', 'March 2023', 'April 2023', 'May 2023', 'June 2023', 'July 2023', 'August 2023', 'September 2023', 'October 2023', 'November 2023', 'December 2023']
const month = months[props.i];

</script>

<template>
    <span class="month-label">{{ month }}</span>
</template>