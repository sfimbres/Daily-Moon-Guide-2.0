<script setup>
import { closeModals } from '../../helpers/functions';
</script>

<template>
    <div class="intro_modals_backdrop backdropStyle"  @click="(e) => closeModals()" ></div>
</template>

<style lang="scss" scoped>
    .backdropStyle{
        position: absolute;
        width: 100%; 
        height: 100%;
        top: 0px; 
        left: 0px;
        z-index: 9998;
        background: rgba(0, 0, 0, 0.8);
    }
</style>
