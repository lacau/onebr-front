<template>
  <div class="contributors-page">
    <v-container>
      <headline
        class="text-center pb-2"
        :title="$t('contributor.headline.title')"
        :subtitle="$t('contributor.headline.subtitle')"
      />

      <v-img
        src="@/assets/contributors_mascot.png"
        max-width="593"
        max-height="354"
        class="mascot"
      />

      <contributor-list />

      <v-divider class="divider" />

      <support-list />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import ContributorList from '../components/ContributorList.vue'
import SupportList from '../components/SupportList.vue'

const ContributorModule = namespace('contributor')

@Component({
  components: {
    Headline,
    ContributorList,
    SupportList,
  },
})
export default class Contributors extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.contributor

  @ContributorModule.Action
  private readonly fetchContributors!: () => Promise<void>

  @ContributorModule.Action
  private readonly fetchContributorImages!: () => Promise<void>

  mounted() {
    this.fetchContributors()
    this.fetchContributorImages()
  }
}
</script>

<style lang="scss" scoped>
.contributors-page {
  background-image: url(../../../assets/contributors_bg.png);
  background-position: center top;
  background-size: 100% 1386px;

  .mascot {
    margin: 48px auto 90px;
  }

  .divider {
    margin: 70px auto 5px;
    width: 80%;
  }
}
</style>
