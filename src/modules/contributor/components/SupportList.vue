<template>
  <div class="support-list">
    <v-img
      contain
      class="support-list__logo"
      v-for="image in contributorImages"
      :key="image.id"
      :alt="image.tooltip"
      :src="image.src"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Image from '@/modules/shared/entities/Image'

const ContributorModule = namespace('contributor')

@Component
export default class SupportList extends Vue {
  @ContributorModule.Getter
  private readonly contributorImages!: Image[]
}
</script>

<style lang="scss" scoped>
.support-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 40px;

  &__logo {
    margin-top: 80px;
    margin-right: 40px;
    max-height: 100px;
    max-width: 148px;
  }
}
</style>
