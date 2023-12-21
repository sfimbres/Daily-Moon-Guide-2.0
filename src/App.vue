<script setup>
import { store, appProps } from './store/index.js'
import IntroSection from './components/IntroSection.vue'
import LoaderSection from './components/LoaderSection.vue'
import MvgSection from './components/MvgSection.vue'
import IntroModals from './components/IntroModals.vue'
import FAQ from './components/faq/FAQ.vue'

</script>

<template>
  <div id="main_container">
    <div id="site_body">
        <section id="subsite_content_page homepage_page">
          <div class="wysiwyg_content">
            <div id="moon_viewing_guide" class="moon_viewing_guide" :class="{ zoomed: store.zoomed , detail_open: store.detail_open }">
              <IntroSection v-if="!appProps.single_day"/>
              <LoaderSection />
              <MvgSection />
              <IntroModals v-if="!appProps.single_day"/>
              <FAQ v-if="store.faq_modal_open"/>
            </div>
          </div>
        </section>
    </div>
  </div>
</template>

