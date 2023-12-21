<script setup> 
import GetMonth from './GetMonth.vue';
const props = defineProps(['select']);
</script>

<template>
    <section class="calendar">
		<GetMonth v-for="n in 12" :i="n-1" :select="props.select"/> 
	</section>
</template>