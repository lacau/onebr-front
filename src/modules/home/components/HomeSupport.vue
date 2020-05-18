<template>
  <v-container px-9>
    <v-row>
      <v-col>
        <h2 class="display-2 primary--text mb-8 pl-4 ml-12">
          {{ $t('home.support.title') }}
        </h2>
        <v-slide-group show-arrows>
          <v-slide-item
            v-for="(image, index) in supportImages"
            :key="image.id"
            :class="{ 'mr-6': index != (supportImages.length-1) }"
          >
            <v-img
              contain
              max-height="100"
              width="148"
              :alt="image.tooltip"
              :src="image.src"
            />
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Image from '@/modules/shared/entities/Image'

const HomeModule = namespace('home')

@Component
export default class HomeSupport extends Vue {
  @HomeModule.Getter
  private readonly supportImages!: Image[]
}
</script>
