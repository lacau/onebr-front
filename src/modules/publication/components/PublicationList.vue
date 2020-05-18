<template>
  <div class="publication-list">
    <div class="publication-list__content">
      <v-select
        outlined
        rounded
        clearable
        hide-details
        class="mb-4"
        style="width: 250px; background: white"
        :label="$t('publication.content_type')"
        :items="types"
        v-model="contentType"
        @change="changeContentType"
      />

      <publication-item
        v-for="(publication, index) in publications"
        :key="index"
        :publication="publication"
      />
    </div>

    <pagination
      class="mt-5"
      v-if="pageable"
      :value="pageable.currentPage"
      :length="pageable.totalPages"
      @input="pageChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Publication from '@/modules/shared/entities/Publication'
import { Pageable } from '@/modules/shared/entities/Pagination'

import Pagination from '@/modules/shared/components/Pagination.vue'
import PublicationItem from './PublicationItem.vue'

const PublicationModule = namespace('publication')

@Component({
  components: {
    Pagination,
    PublicationItem,
  },
})
export default class PublicationList extends Vue {
  @PublicationModule.Getter
  private readonly publications!: Publication[]

  @PublicationModule.Getter
  private readonly pageable!: Pageable

  @PublicationModule.Action
  private readonly fetchPublications!: (_: {contentType?: string; page?: number}) => Promise<void>

  @Watch('$i18n.locale')
  changeLocale() {
    const page = this.pageable.currentPage - 1

    this.fetchPublications({
      contentType: this.contentType,
      page,
    })
  }

  private contentType = ''

  private get types() {
    return [
      {
        text: this.$i18n.t('admin.publication.types.publication'),
        value: 'PUBLICATION',
      },
      {
        text: this.$i18n.t('admin.publication.types.video'),
        value: 'VIDEO',
      },
      {
        text: this.$i18n.t('admin.publication.types.pop'),
        value: 'POP',
      },
    ]
  }

  private pageChange(page: number) {
    if (this.pageable.currentPage === page) return

    this.fetchPublications({
      contentType: this.contentType,
      page: page - 1,
    })
  }

  private changeContentType() {
    this.fetchPublications({
      contentType: this.contentType,
    })
  }
}
</script>

<style lang="scss" scoped>
.publication-list {
  &__content {
    margin: 0 auto;
    max-width: 1120px;
  }
}
</style>
