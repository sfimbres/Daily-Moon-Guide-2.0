<script setup>
    import BinocularsSvg from '../svg/BinocularsSvg.vue';
    import NakedEyeSvg from '../svg/NakedEyeSvg.vue';
    import TelescopeSvg from '../svg/TelescopeSvg.vue';

    const props = defineProps(['view_cat']);
</script>

<template>
    <div class="icon_wrapper eye suggested" v-if="view_cat <= 0">
        <NakedEyeSvg />
    </div>
    <div class="icon_wrapper binoculars suggested" v-if="view_cat <= 1">
        <BinocularsSvg />
    </div>
    <div class="icon_wrapper telescope suggested" v-if="view_cat <= 2">
        <TelescopeSvg />
    </div>
</template>