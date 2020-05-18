<template>
  <div class="home-page pt-0">
    <home-hero />
    <home-bacteria />
    <home-about />
    <home-support />
    <views-count />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import ViewsCount from '@/modules/shared/components/ViewsCount.vue'
import HomeAbout from '../components/HomeAbout.vue'
import HomeBacteria from '../components/HomeBacteria.vue'
import HomeHero from '../components/HomeHero.vue'
import HomeSupport from '../components/HomeSupport.vue'

const HomeModule = namespace('home')

@Component({
  components: {
    HomeAbout,
    HomeBacteria,
    HomeHero,
    HomeSupport,
    ViewsCount,
  },
})
export default class Home extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.home

  @HomeModule.Action
  private readonly fetchSupportImages!: () => Promise<void>

  mounted() {
    this.fetchSupportImages()
  }
}
</script>
