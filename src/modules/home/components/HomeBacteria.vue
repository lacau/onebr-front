<template>
  <v-container class="home-bacteria">
    <v-row class="justify-space-evenly">
      <v-col
        cols="12"
        sm="6" md="4" lg='3'
        v-for="bacterium in bacteria"
        :key="bacterium.name"
      >
        <figure class="text-center">
          <img
            :alt="`Bacterium ${bacterium.name}`"
            :src="bacterium.image"
            width="161"
            height="120"
          >
          <figcaption>
            <h1 class="display-1 font-weight-medium mb-2 mt-3">
              {{ bacterium.name }}
            </h1>
            <p class="title font-italic font-weight-regular mb-1">
              {{ bacterium.scientificName }}
            </p>
            <p class="body-2 grey--text text--darken-1 mb-8">
              {{ bacterium.origin }}
            </p>
            <primary-button :to="{
              name: 'bacteria',
              params: { name: bacterium.name }
            }">
              {{ $t('home.see_map') }}
            </primary-button>
          </figcaption>
        </figure>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Bacteria from '@/modules/shared/entities/Bacteria'

import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

const SharedModule = namespace('shared')

@Component({
  components: {
    PrimaryButton,
  },
})
export default class HomeBacteria extends Vue {
  @SharedModule.State
  private readonly bacteria!: Bacteria[]
}
</script>

<style lang="scss" scoped>
.home-bacteria {
  padding: 84px 96px 0;
}
</style>
