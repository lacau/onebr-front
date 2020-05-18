<template>
  <v-container pa-0>
    <v-data-table
      dense
      disable-pagination
      hide-default-footer
      class="--striped"
      :options.sync="options"
      :server-items-length="publications.length"
      :headers="headers"
      :items="publications"
    >
      <template #item.date="{ item }">
        {{ $d(item.date) }}
      </template>

      <template #item.link="{ item }">
        <a class="d-block text-truncate" style="max-width: 310px">
          {{ item.link }}
        </a>
      </template>

      <template #item.titlePt="{ item }">
        <span class="d-block text-truncate" style="max-width: 400px">
          {{ item.titlePt }}
        </span>
      </template>

      <template #item.titleEn="{ item }">
        <span class="d-block text-truncate" style="max-width: 400px">
          {{ item.titleEn }}
        </span>
      </template>

      <template #item.actions="{ item }">
        <v-btn text color="primary" @click="editPublication(item.id)">
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
          :value="pageable.currentPage"
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

import Publication from '@/modules/shared/entities/Publication'
import PublicationFilter from '@/modules/shared/entities/PublicationFilter'
import { Pageable } from '@/modules/shared/entities/Pagination'

import Icon from '@/modules/shared/components/Icon.vue'
import Pagination from '@/modules/shared/components/Pagination.vue'

const AdminPublicationModule = namespace('admin_publication')

@Component({
  components: {
    Icon,
    Pagination,
  },
})
export default class PublicationTable extends Vue {
  @AdminPublicationModule.Getter
  private readonly publications!: Publication[]

  @AdminPublicationModule.Getter
  private readonly pageable!: Pageable

  @AdminPublicationModule.Getter
  private readonly filter!: PublicationFilter

  @AdminPublicationModule.Action
  private readonly fetchPublications!: (filter: PublicationFilter) => Promise<void>

  @AdminPublicationModule.Action
  private readonly fetchPublicationById!: (id: number) => Promise<void>

  private get headers(): DataTableHeader[] {
    const getText = (key: string) => this.$i18n.t(`admin.publication.columns.${key}`) as string

    return [
      {
        text: getText('type'),
        value: 'type',
      },
      {
        text: getText('order'),
        value: 'order',
      },
      {
        text: getText('date'),
        value: 'date',
      },
      {
        text: getText('link'),
        value: 'link',
      },
      {
        text: getText('title'),
        value: (this.$i18n.locale === 'en') ? 'titleEn' : 'titlePt',
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
    this.fetchPublications(newFilter)
  }

  private pageChange(page: number) {
    if (this.filter.page === page) return

    const newFilter = this.filter.copyWith({ page })
    this.fetchPublications(newFilter)
  }

  private editPublication(id: number) {
    this.fetchPublicationById(id)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 30px;
}
</style>
