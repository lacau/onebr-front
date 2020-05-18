<template>
  <v-sheet tile class="home-hero" height="570" color="#f5f5ff">
    <v-img src="@/assets/home_hero_bg.png" height="100%">
      <v-container fill-height pr-8>
        <v-row class="ml-12">
          <v-col class="pl-10">
            <h1 class="primary--text">
              {{ $t('home.intro.title') }}
            </h1>

            <p class="body-1 mb-0 mt-6" v-html="$t('home.intro.text')" />

            <primary-button
              invert
              class="mt-7 px-10"
              @click="seeMore()"
            >
              {{ $t('shared.see_more') }}
            </primary-button>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

@Component({
  components: {
    PrimaryButton,
  },
})
export default class HomeHero extends Vue {
  private seeMore() {
    this.$vuetify.goTo('#section-about')
  }
}
</script>

<style lang="scss" scoped>
.home-hero {
  .container {
    background-image: url(../../../assets/home_mascot.png);
    background-origin: content-box;
    background-position: center right;
    background-size: 700px 384px;
  }

  h1 {
    font-size: 40px;
    font-weight: 400;
    line-height: 49px;
    max-width: 659px;
  }

  p {
    line-height: 200%;
    max-width: 590px;
  }
}
</style>
