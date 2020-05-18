<template>
  <div class="contributor-list">
    <v-chip
      v-for="contributor in contributors"
      :key="contributor.order"
      color="secondary"
      class="primary--text mr-5 mb-5 px-5"
    >
      {{ contributor.name }} - {{ contributor.description }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Contributor from '@/modules/shared/entities/Contributor'

const ContributorModule = namespace('contributor')

@Component
export default class ContributorList extends Vue {
  @ContributorModule.Getter
  private readonly contributors!: Contributor[]
}
</script>

<style lang="scss" scoped>
.contributor-list {
  margin: 0 auto;
  max-width: 1215px;
  padding-left: 20px;
  text-align: center;
}
</style>
