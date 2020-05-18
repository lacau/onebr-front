<template>
  <v-form class="experiment-filter" autocomplete="off">
    <v-container>
      <v-row align="center" justify="center">
        <v-col class="flex-grow-0">
          <primary-button invert @click="addExperiment()">
            <icon left name="add" />
            {{ $t('admin.experiment.filter.add') }}
          </primary-button>
        </v-col>
        <v-col md="3">
          <v-select
            clearable
            outlined
            rounded
            hide-details
            item-text="name"
            item-value="type"
            :value="filter.type"
            :items="species"
            :placeholder="$t('admin.experiment.filter.specie')"
            @change="value => applyFilter('type', value)"
          />
        </v-col>
        <v-col>
          <v-text-field
            clearable
            outlined
            rounded
            hide-details
            :value="filter.searchTerm"
            :placeholder="$t('admin.experiment.filter.search')"
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

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import ExperimentModel from '@/modules/shared/entities/form-models/Experiment'

import DeleteIcon from '@/modules/shared/components/icons/DeleteIcon.vue'
import SearchIcon from '@/modules/shared/components/icons/SearchIcon.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import Icon from '@/modules/shared/components/Icon.vue'

const AdminExperimentModule = namespace('admin_experiment')

@Component({
  components: {
    DeleteIcon,
    SearchIcon,
    PrimaryButton,
    Icon,
  },
})
export default class ExperimentFilter extends Vue {
  @AdminExperimentModule.State
  private readonly species!: unknown[]

  @AdminExperimentModule.Getter
  private readonly filter!: BacteriaFilter

  @AdminExperimentModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

  @AdminExperimentModule.Mutation
  private readonly setFormModel!: (formModel: ExperimentModel) => Promise<void>

  private debouncedApplyFilter = debounce(this.applyFilter, 750)

  private applyFilter(name: string, value: string|number|number[]): void {
    const newFilter = this.filter.copyWith({
      [name]: value,
      page: 1,
    })

    this.fetchExperiments(newFilter)
  }

  private clearSearch() {
    const newFilter = BacteriaFilter.empty()
    this.fetchExperiments(newFilter)
  }

  private addExperiment() {
    this.setFormModel(ExperimentModel.empty())
  }
}
</script>

<style lang="scss" scoped>
.experiment-filter {
  .container {
    padding: 8px 16px;
  }
}
</style>
