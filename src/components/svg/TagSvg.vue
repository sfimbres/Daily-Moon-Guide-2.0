<script setup>
import { onMounted } from 'vue';
import { hotspotHover } from '../../helpers/functions';
const props = defineProps(['i'])

onMounted(() => {
    if(props.i > 2){
        hotspotHover();
    }
})
</script>

<template>
    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" v-if="props.i === 0">
        <g id="icon/circle-check" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
            <circle class="sightspot_circle" id="Oval-Copy-2" stroke="#FFFFFF" stroke-width="2" fillOpacity="0.6" fill="#484848" cx="12" cy="12" r="11"/>
            <g id="icon/check" transform="translate(8.000000, 9.000000)" fill="#FFFFFF" fillRule="nonzero">
            <g id="check">
                <path d="M7.80139517,1.54545455 C7.80139517,1.54545455 7.70852142,1.54545455 7.80139517,1.54545455 L5.94392013,3.36363636 C5.94392013,3.36363636 5.94392013,3.36363636 5.94392013,3.36363636 L5.75817262,3.54545455 C5.75817262,3.54545455 5.75817262,3.54545455 5.75817262,3.54545455 C5.75817262,3.54545455 5.75817262,3.54545455 5.75817262,3.54545455 L3.99357134,5.18181818 C3.99357134,5.18181818 3.99357134,5.18181818 3.99357134,5.18181818 L3.43632882,5.81818182 C3.43632882,5.81818182 3.43632882,5.81818182 3.43632882,5.81818182 C3.34345507,5.90909091 3.15770757,6 2.97196006,6 C2.78621256,6 2.60046506,5.90909091 2.41471755,5.81818182 C2.41471755,5.81818182 2.41471755,5.81818182 2.41471755,5.81818182 L2.41471755,5.81818182 L0.278621256,3.72727273 C-0.092873752,3.36363636 -0.092873752,2.72727273 0.278621256,2.36363636 C0.46436876,2.18181818 0.742990016,2.09090909 1.02161127,2.09090909 C1.30023253,2.09090909 1.57885378,2.18181818 1.76460129,2.36363636 L2.97196006,3.54545455 L6.31541514,0.272727273 C6.31541514,0.272727273 6.31541514,0.272727273 6.31541514,0.272727273 C6.50116264,0.0909090909 6.7797839,0 6.9655314,0 C7.24415266,0 7.52277391,0.0909090909 7.70852142,0.272727273 C8.08001642,0.545454545 8.08001642,1.09090909 7.80139517,1.54545455 Z" id="Shape"/>
            </g>
            </g>
        </g>
    </svg>

    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" v-else-if="props.i === 1">
        <g id="icon/hotspot-sq" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
            <circle class="sightspot_circle" id="Oval-Copy" stroke="#33BFAD" stroke-width="2" fillOpacity="0.6" fill="#000000" cx="12" cy="12" r="11"/>
            <rect id="Rectangle" fill="#FFFFFF" x="9" y="9" width="6" height="6"/>
        </g>
    </svg>

    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" v-else-if="props.i === 2">
        <g id="icon/hotspot-tri" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
            <circle class="sightspot_circle" id="Oval-Copy" stroke="#FF62F5" stroke-width="2" fillOpacity="0.6" fill="#000000" cx="12" cy="12" r="11"/>
            <polygon id="Triangle" fill="#FFFFFF" points="12 7 16 15 8 15"/>
        </g>
    </svg>

    <svg viewBox="0 0 24 24" version="1.1" v-else>
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
            <g id="Label-Copy">
            <circle class="sightspot_circle" id="Oval-Copy" stroke="#78CBFF" stroke-width="2" fillOpacity="0.6" fill="#000000" cx="12" cy="12" r="11"/>
            <circle id="Oval" fill="#FFFFFF" cx="12" cy="12" r="3"/>
            </g>
        </g>
    </svg>
</template>