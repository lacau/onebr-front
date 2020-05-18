<template>
  <v-container pa-0>
    <v-data-table
      dense
      disable-pagination
      hide-default-footer
      class="--striped"
      :options.sync="options"
      :server-items-length="users.length"
      :headers="headers"
      :items="users"
    >
      <template #item.active="{ item }">
        {{ $t(`shared.${item.active ? 'yes': 'no'}`) }}
      </template>

      <template #item.actions="{ item }">
        <v-btn text color="primary" @click="editUser(item.id)">
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

import User from '@/modules/shared/entities/User'
import UserFilter from '@/modules/shared/entities/UserFilter'
import { Pageable } from '@/modules/shared/entities/Pagination'

import Icon from '@/modules/shared/components/Icon.vue'
import Pagination from '@/modules/shared/components/Pagination.vue'

const AdminUserModule = namespace('admin_user')

@Component({
  components: {
    Icon,
    Pagination,
  },
})
export default class ExperimentTable extends Vue {
  @AdminUserModule.Getter
  private readonly users!: User[]

  @AdminUserModule.Getter
  private readonly pageable!: Pageable

  @AdminUserModule.Getter
  private readonly filter!: UserFilter

  @AdminUserModule.Action
  private readonly fetchUsers!: (filter: UserFilter) => Promise<void>

  @AdminUserModule.Action
  private readonly fetchUserById!: (id: number) => Promise<void>

  private get headers(): DataTableHeader[] {
    const getText = (key: string) => this.$i18n.t(`admin.user.columns.${key}`) as string

    return [
      {
        text: getText('name'),
        value: 'name',
      },
      {
        text: getText('email'),
        value: 'email',
      },
      {
        text: getText('species'),
        value: 'specieFormatted',
        sortable: false,
      },
      {
        text: getText('status'),
        value: 'active',
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
    this.fetchUsers(newFilter)
  }

  private pageChange(page: number) {
    if (this.filter.page === page) return

    const newFilter = this.filter.copyWith({ page })
    this.fetchUsers(newFilter)
  }

  private editUser(id: number) {
    this.fetchUserById(id)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 30px;
}
</style>
