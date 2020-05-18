<template>
  <div class="scaffold">
    <div class="scaffold__header">
      <breadcrumbs :items="breadcrumbItems" />

      <headline
        dense
        :title="$t('admin.publication.headline.title')"
        :subtitle="$t('admin.publication.headline.subtitle')"
      />
    </div>

    <div class="scaffold__body">
      <publication-filter />

      <publication-table />

      <publication-form />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'
import PublicationFilterEntity from '@/modules/shared/entities/PublicationFilter'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import Breadcrumbs from '@/modules/shared/components/Breadcrumbs.vue'
import PublicationFilter from '../components/PublicationFilter.vue'
import PublicationTable from '../components/PublicationTable.vue'
import PublicationForm from '../components/PublicationForm.vue'

const AdminPublicationModule = namespace('admin_publication')

@Component({
  components: {
    Headline,
    Breadcrumbs,
    PublicationFilter,
    PublicationTable,
    PublicationForm,
  },
})
export default class Publications extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.restrictedPublication

  @AdminPublicationModule.Action
  private readonly fetchPublications!: (filter: PublicationFilterEntity) => Promise<void>

  private get breadcrumbItems() {
    return [
      {
        text: this.$t('shared.back'),
        disabled: false,
        to: {
          name: 'admin.dashboard',
        },
        icon: 'home',
        exact: true,
      },
    ]
  }

  mounted() {
    const filter = PublicationFilterEntity.empty()
    this.fetchPublications(filter)
  }
}
</script>

<style lang="scss" scoped>
.scaffold {
  &__header {
    padding-left: 50px;
    padding-bottom: 40px;
  }

  &__body {
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.15);
    padding-bottom: 30px;
  }
}
</style>
