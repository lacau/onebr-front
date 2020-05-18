<template>
  <v-container class="dashboard">
    <headline
      :title="$t('admin.dashboard.headline.title')"
      :subtitle="$t('admin.dashboard.headline.subtitle')"
    />

    <div class="dashboard__buttons">
      <image-button
        v-for="option in options"
        :key="option.key"
        :to="{ name: option.key }"
      >
        <template #image>
          <img :src="getImage(option.key)">
        </template>

        {{ option.name }}
      </image-button>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import DashboardOption from '@/modules/shared/entities/DashboardOption'
import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import ImageButton from '../components/ImageButton.vue'

const AdminDashboardModule = namespace('admin_dashboard')

@Component({
  components: {
    Headline,
    ImageButton,
  },
})
export default class Dashboard extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.restrictedDashboard

  @AdminDashboardModule.Getter
  private readonly options!: DashboardOption[]

  @AdminDashboardModule.Action
  private readonly fetchOptions!: () => Promise<void>

  getImage(key: string) {
    switch (key) {
      case 'admin.experiments':
        return '/dashboard/bacteria.png'

      case 'admin.publications':
        return '/dashboard/document.png'

      case 'admin.users':
        return '/dashboard/group.png'

      default:
        return ''
    }
  }

  @Watch('$i18n.locale')
  changeLocale() {
    this.fetchOptions()
  }

  mounted() {
    this.fetchOptions()
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  margin-left: 85px;
  margin-top: 70px;

  &__buttons {
    display: flex;
    margin-top: 60px;

    > :not(:last-child) {
      margin-right: 40px;
    }
  }
}
</style>
