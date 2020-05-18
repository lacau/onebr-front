<template>
  <v-form class="user-filter" autocomplete="off">
    <v-container>
      <v-row align="center" justify="center">
        <v-col class="flex-grow-0">
          <primary-button invert @click="addUser()" v-if="false">
            <icon left name="add" />
            {{ $t('admin.user.filter.add') }}
          </primary-button>
        </v-col>
        <v-col>
          <v-text-field
            clearable
            outlined
            rounded
            hide-details
            :value="filter.searchTerm"
            :placeholder="$t('admin.user.filter.search')"
            @input="value => debouncedApplyFilter('searchTerm', value)"
          >
            <template #append>
              <search-icon />
            </template>
          </v-text-field>
        </v-col>
        <v-col md="1">
          <v-btn
            text
            small
            class="caption text-capitalize"
            @click="clearSearch()"
          >
            <delete-icon class="mr-2" />
            {{ $t('shared.clear') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { debounce } from '@/modules/shared/utils/functions'

import UserFilterEntity from '@/modules/shared/entities/UserFilter'
import UserModel from '@/modules/shared/entities/form-models/User'

import DeleteIcon from '@/modules/shared/components/icons/DeleteIcon.vue'
import SearchIcon from '@/modules/shared/components/icons/SearchIcon.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import Icon from '@/modules/shared/components/Icon.vue'

const AdminUserModule = namespace('admin_user')

@Component({
  components: {
    DeleteIcon,
    SearchIcon,
    PrimaryButton,
    Icon,
  },
})
export default class UserFilter extends Vue {
  @AdminUserModule.Getter
  private readonly filter!: UserFilterEntity

  @AdminUserModule.Action
  private readonly fetchUsers!: (filter: UserFilterEntity) => Promise<void>

  @AdminUserModule.Mutation
  private readonly setFormModel!: (formModel: UserModel|null) => Promise<void>

  private debouncedApplyFilter = debounce(this.applyFilter, 750)

  private applyFilter(name: string, value: string|number|number[]): void {
    const newFilter = this.filter.copyWith({
      [name]: value,
      page: 1,
    })

    this.fetchUsers(newFilter)
  }

  private clearSearch() {
    const newFilter = UserFilterEntity.empty()
    this.fetchUsers(newFilter)
  }

  private addUser() {
    this.setFormModel(UserModel.empty())
  }
}
</script>

<style lang="scss" scoped>
.user-filter {
  .container {
    padding: 8px 16px;
  }
}
</style>
