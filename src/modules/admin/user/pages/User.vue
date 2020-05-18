<template>
  <div class="scaffold">
    <div class="scaffold__header">
      <breadcrumbs :items="breadcrumbItems" />

      <headline
        dense
        :title="$t('admin.user.headline.title')"
        :subtitle="$t('admin.user.headline.subtitle')"
      />
    </div>

    <div class="scaffold__body">
      <user-filter />

      <user-table />

      <user-form />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import UserFilterEntity from '@/modules/shared/entities/UserFilter'
import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import Breadcrumbs from '@/modules/shared/components/Breadcrumbs.vue'
import UserTable from '../components/UserTable.vue'
import UserFilter from '../components/UserFilter.vue'
import UserForm from '../components/UserForm.vue'

const AdminUserModule = namespace('admin_user')

@Component({
  components: {
    Headline,
    Breadcrumbs,
    UserTable,
    UserFilter,
    UserForm,
  },
})
export default class User extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.restrictedUser

  @AdminUserModule.Action
  private readonly fetchUsers!: (filter: UserFilterEntity) => Promise<void>

  @AdminUserModule.Action
  private readonly fetchSpecies!: () => Promise<void>

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
    const filter = UserFilterEntity.empty()
    this.fetchUsers(filter)
    this.fetchSpecies()
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
