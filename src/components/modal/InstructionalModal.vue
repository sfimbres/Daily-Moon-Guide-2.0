<script setup>
import Modal from './Modal.vue';
import { closeModals } from '../../helpers/functions';
</script>

<template>
    <div>
        <Modal :isOpen="false" @close="(e) => closeModals()" :noBackdrop="true" class="mvg_instruction_modal instruction_modal modal modal_styles">
            <div class='close' @click="() => { closeModals() }">
                <div class="icon">✕</div>
            </div>
            <p class="body">This Moon map highlights up to three recommended sites that you can observe today, based on the lunar phase and your view mode.</p>
            <p class="body">The variety of hotspots will increase or decrease depending on your viewing mode.</p>
            <button class="button" @click="(e) => closeModals()">GOT IT</button>
        </Modal> 
    </div>
    
</template>

<style lang="scss">
    .modal_styles {
        background-color: #1c2027;
        top: 50%;
        left: 50%;
        position: fixed;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
</style>

<style lang="scss" scoped>
    .close {
        position: absolute;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 36px;
        right: 0;
        top: 0;
        padding: 11px;
        cursor: pointer;
        transition: opacity 125ms ease-out;
    }

    .icon {
        color: white;
    }

    .button {
        font-weight: 700;
        display: inline-block;
        margin-bottom: 0.5em;
        margin-left: auto;
        margin-right: auto;
        background-color: #4583C0;
        color: white;
        line-height: 1em;
        border: 0;
        text-decoration: none;
        border-radius: 4px;
        cursor: pointer;
        text-shadow: none;
        font-size: 13px;
        padding: 12px 24px;
        text-transform: uppercase;
        white-space: nowrap;
    }
</style>