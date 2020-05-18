<template>
  <v-container pa-0>
    <v-data-table
      dense
      disable-pagination
      hide-default-footer
      class="--striped"
      :options.sync="options"
      :server-items-length="experiments.length"
      :headers="headers"
      :items="experiments"
    >
      <template #item.host="{ item }">
        <span :class="{'font-italic': item.host !== 'NA' }">
          {{ item.host }}
        </span>
      </template>

      <template #item.actions="{ item }">
        <v-btn text color="primary" @click="editExperiment(item.id)">
          <icon
            left
            outlined
            name="create"
            size="18"
          />
          {{ $t('shared.actions.edit') }}
        </v-btn>
      </template>

      <template #footer>
        <pagination
          class="pagination"
          v-if="pageable"
          :value="filter.page"
          :length="pageable.totalPages"
          @input="pageChange"
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DataTableHeader } from 'vuetify'
import { namespace } from 'vuex-class'

import ExperimentListItem from '@/modules/shared/entities/ExperimentListItem'
import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import { Pageable } from '@/modules/shared/entities/Pagination'

import Icon from '@/modules/shared/components/Icon.vue'
import Pagination from '@/modules/shared/components/Pagination.vue'

const AdminExperimentModule = namespace('admin_experiment')

@Component({
  components: {
    Icon,
    Pagination,
  },
})
export default class ExperimentTable extends Vue {
  @AdminExperimentModule.Getter
  private readonly experiments!: ExperimentListItem[]

  @AdminExperimentModule.Getter
  private readonly pageable!: Pageable

  @AdminExperimentModule.Getter
  private readonly filter!: BacteriaFilter

  @AdminExperimentModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

  @AdminExperimentModule.Action
  private readonly fetchExperimentById!: (id: number) => Promise<void>

  private get headers(): DataTableHeader[] {
    const getText = (key: string) => this.$i18n.t(`admin.experiment.columns.${key}`) as string

    return [
      {
        text: getText('specie'),
        value: 'specieName',
      },
      {
        text: getText('id'),
        value: 'identification',
      },
      {
        text: getText('city'),
        value: 'cityName',
      },
      {
        text: getText('date'),
        value: 'date',
      },
      {
        text: getText('origin'),
        value: (this.$i18n.locale === 'en') ? 'originNameEn' : 'originNamePt',
      },
      {
        text: getText('source'),
        value: (this.$i18n.locale === 'en') ? 'sourceNameEn' : 'sourceNamePt',
      },
      {
        text: getText('host'),
        value: 'host',
      },
      {
        text: getText('st'),
        value: 'st',
      },
      {
        text: '',
        value: 'actions',
        sortable: false,
      },
    ]
  }

  private get options() {
    const [sortBy, order] = this.filter.sort

    return {
      sortBy: [sortBy],
      sortDesc: [order === 'desc'],
    }
  }

  private set options(options) {
    const { sortBy: [column], sortDesc: [isDesc] } = options
    let sort = new Array<string>()

    if (column) {
      sort = [column, isDesc ? 'desc' : 'asc']
    }

    const newFilter = this.filter.copyWith({ sort })
    this.fetchExperiments(newFilter)
  }

  private pageChange(page: number) {
    if (this.filter.page === page) return

    const newFilter = this.filter.copyWith({ page })
    this.fetchExperiments(newFilter)
  }

  private editExperiment(id: number) {
    this.fetchExperimentById(id)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 30px;
}
</style>
