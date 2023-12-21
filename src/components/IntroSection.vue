<script setup>
import MoonAnimationSvg from './MoonAnimationSvg.vue'
import { scrollToMvg } from '../helpers/functions';
</script>

<template>
  <section class="intro">
    <div class="background">
      <div class="cloud1"></div>
      <div class="cloud2"></div>
      <div class="cloud3"></div>
      <div class="cloud4"></div>
      <div class="foreground_images"></div>
    </div>
    <div class="floating_text_area">
      <div class="animated_moon" id="animated_moon">
        <MoonAnimationSvg />
      </div>
      <h2>Daily Moon Guide</h2>
      <p>NASA's interactive map for observing the Moon each day of the year.</p>
      <div class="more" @click="() => {scrollToMvg()}">
        WHAT WILL YOU SEE? <span class="down_arrow"></span>
      </div>
    </div>
  </section>
</template>


