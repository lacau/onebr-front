<template>
  <v-form class="publication-filter" autocomplete="off">
    <v-container>
      <v-row align="center" justify="center">
        <v-col class="flex-grow-0">
          <primary-button invert @click="addPublication()">
            <icon left name="add" />
            {{ $t('admin.publication.filter.add') }}
          </primary-button>
        </v-col>
        <v-col>
          <v-text-field
            clearable
            outlined
            rounded
            hide-details
            :value="filter.searchTerm"
            :placeholder="$t('admin.publication.filter.search')"
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

import PublicationFilterEntity from '@/modules/shared/entities/PublicationFilter'
import PublicationModel from '@/modules/shared/entities/form-models/Publication'

import DeleteIcon from '@/modules/shared/components/icons/DeleteIcon.vue'
import SearchIcon from '@/modules/shared/components/icons/SearchIcon.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import Icon from '@/modules/shared/components/Icon.vue'

const AdminPublicationModule = namespace('admin_publication')

@Component({
  components: {
    DeleteIcon,
    SearchIcon,
    PrimaryButton,
    Icon,
  },
})
export default class PublicationFilter extends Vue {
  @AdminPublicationModule.Getter
  private readonly filter!: PublicationFilterEntity

  @AdminPublicationModule.Action
  private readonly fetchPublications!: (filter: PublicationFilterEntity) => Promise<void>

  @AdminPublicationModule.Mutation
  private readonly setFormModel!: (formModel: PublicationModel) => Promise<void>

  private debouncedApplyFilter = debounce(this.applyFilter, 750)

  private applyFilter(name: string, value: string|number|number[]): void {
    const newFilter = this.filter.copyWith({
      [name]: value,
      page: 1,
    })

    this.fetchPublications(newFilter)
  }

  private clearSearch() {
    const newFilter = PublicationFilterEntity.empty()
    this.fetchPublications(newFilter)
  }

  private addPublication() {
    this.setFormModel(PublicationModel.empty())
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
