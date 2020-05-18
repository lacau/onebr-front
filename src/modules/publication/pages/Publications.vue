<template>
  <div class="publications-page">
    <v-container>
      <headline
        class="text-center pb-2"
        :title="$t('publication.headline.title')"
        :subtitle="$t('publication.headline.subtitle')"
      />

      <v-img
        src="@/assets/publication_mascot.png"
        max-width="592"
        max-height="267"
        class="mascot"
      />

      <publication-list />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'
import { Pageable } from '@/modules/shared/entities/Pagination'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import PublicationList from '../components/PublicationList.vue'

const PublicationModule = namespace('publication')

@Component({
  components: {
    Headline,
    PublicationList,
  },
})
export default class Publications extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.publication

  @PublicationModule.Action
  private readonly fetchPublications!: (_: {contentType?: string; page?: number}) => Promise<void>

  @PublicationModule.Getter
  private readonly pageable!: Pageable

  mounted() {
    this.fetchPublications({})
  }
}
</script>

<style lang="scss" scoped>
.publications-page {
  background-image: url(../../../assets/publication_bg.png);

  .mascot {
    margin: 48px auto 90px;
  }
}
</style>
