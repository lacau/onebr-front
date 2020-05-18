<template>
  <div class="scaffold">
    <div class="scaffold__header">
      <breadcrumbs :items="breadcrumbItems" />

      <headline
        dense
        :title="$t('admin.experiment.headline.title')"
        :subtitle="$t('admin.experiment.headline.subtitle')"
      />
    </div>

    <div class="scaffold__body">
      <experiment-filter />

      <experiment-table />

      <experiment-form />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import Breadcrumbs from '@/modules/shared/components/Breadcrumbs.vue'
import ExperimentFilter from '../components/ExperimentFilter.vue'
import ExperimentForm from '../components/ExperimentForm.vue'
import ExperimentTable from '../components/ExperimentTable.vue'

const AdminExperimentModule = namespace('admin_experiment')

@Component({
  components: {
    Breadcrumbs,
    ExperimentFilter,
    ExperimentForm,
    ExperimentTable,
    Headline,
  },
})
export default class Experiment extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.restrictedExperiment

  @AdminExperimentModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

  @AdminExperimentModule.Action
  private readonly fetchBacteriaFilters!: () => Promise<void>

  @AdminExperimentModule.Action
  private readonly fetchLocalizedBacteriaFilters!: () => Promise<void>

  @Watch('$i18n.locale')
  changeLocale() {
    this.fetchLocalizedBacteriaFilters()
  }

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
    const filter = BacteriaFilter.empty()
    this.fetchExperiments(filter)
    this.fetchBacteriaFilters()
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
