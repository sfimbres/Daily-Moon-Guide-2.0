<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { store, appProps } from '../store/index.js'
import { moon_and_hotspots_ref, hotspots_ref, scroll_to_show_more_ref, mvg_loader} from '../store/index.js'
import { closeMenus, positionViewFrameWrapper, hideScrollToShowMore, initListeners, determineTags, formatSitespots, hotspotHover, getHotspots } from '../helpers/functions'
import INOMNBrandLogoIcon from './mvg/INOMNBrandLogoIcon.vue';
import DownArrowSvg from './svg/DownArrowSvg.vue';
import DetailInnerWrapper from './mvg/DetailInnerWrapper.vue'
import ZoomMapToggleButton from './mvg/ZoomMapToggleButton.vue';
import MoonOrEventDetailSelector from './mvg/MoonOrEventDetailSelector.vue';
import DesktopViewFrame from './mvg/DesktopViewFrame.vue';
import MoonData from './mvg/MoonData.vue';
import Toolbar from './mvg/Toolbar.vue';
import HotspotHelper from './mvg/HotspotHelper.vue';
const isMounted = ref(false); 

// computed properties //
const moonSource = computed(() => {
    return store.moon_data ? "/src/assets/images" + store.moon_data.image_src : null;
});

// hooks //
onMounted(() => {
    
    document.querySelector('body').classList.add('moon_viewing_guide_page')
    positionViewFrameWrapper();
    hideScrollToShowMore();
    initListeners(); 

    if(appProps.single_day){
        determineTags()
        document.querySelector('body').classList.add('single_day')
    }

    setTimeout(() => {
        // allows hotspots to properly find their position in the dom before we check for overlaps, otherwise only one hotspot will be shown on first load
        let visible_hotspots = getHotspots(appProps.hotspots, 'recommended', 0, store.moon_data.subsolar, store.date); 
        store.visible_hotspots = visible_hotspots;
        store.has_mounted_once = true; 
        isMounted.value = true;
        mvg_loader.value.style.zIndex = '-1'
        formatSitespots();
        hotspotHover();
    }, 1000) // arbitrary time, extend if necessary
}); 

watch(() => store.visible_hotspots, () => {
    hotspotHover();
    formatSitespots();
})

</script>

<template> 
    <section id="moon_section" class="moon_view" :class="[{ detail_open: store.detail_open}, store.hemisphere]">
        <div class="main-window">
            <div class='moon_img_and_detail_container'>
                <INOMNBrandLogoIcon />
                <div class="mvg moon_and_hotspots" ref="moon_and_hotspots_ref"> 
                    <div class='moon_img' id='moon_img'>
                        <img :src="moonSource" />
                        <div class="hotspots" :class="{ active: isMounted }" ref="hotspots_ref">
                            <HotspotHelper v-for="(v,i) in store.visible_hotspots" :key="v.formal_name" :i="i" :v="v"/>
                        </div>
                        <div class="scroll_for_more" ref="scroll_to_show_more_ref"> 
                            <span class="down_arrow">
                                <DownArrowSvg />
                            </span>
                            <span class="scroll_text">SCROLL FOR MORE</span>
                        </div>
                    </div>
                </div>
                <div class="moon_detail">
                    <DetailInnerWrapper />
                </div>
                <ZoomMapToggleButton :is_mobile="true"/>
                <MoonOrEventDetailSelector v-if="!store.detail_open"/>
                <DesktopViewFrame  v-show="!store.detail_open"/>
            </div>
            <div class="transparent_cover" :class="store.calendar_open || store.events_menu_open || store.mobile_view_frame_open ? 'open' : ''" @click="() => { closeMenus() }" ></div> 
            <MoonData /> 
        </div>
        <Toolbar v-if="!store.detail_open"/>
    </section>
</template>

<style lang="scss" scoped>
  .main-window{
    overflow-x: hidden;
  }
</style>