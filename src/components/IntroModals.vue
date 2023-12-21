<script setup>
    import { store } from '../store/index.js'
    import ModalsBackdrop from './modal/ModalsBackdrop.vue';
    import OnboardModals from './modal/OnboardModals.vue';
    import InstructionalModal from './modal/InstructionalModal.vue';
</script>

<template>
    <div class="intro_modals_container" v-if="!store.modals_closed">
        <ModalsBackdrop />
        <OnboardModals />
        <InstructionalModal />
    </div>
</template>
