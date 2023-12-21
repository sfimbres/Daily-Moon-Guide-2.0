<script setup>
const props = defineProps(['isOpen', 'noBackdrop']);
</script>

<template>
    <div :class="[{open: isOpen}]">
        <slot></slot>  
    </div>    
</template>


