<template>
  <v-form class="experiment-filter" autocomplete="off">
    <v-container>
      <v-row align="center">
        <v-col md="3">
          <v-text-field
            clearable
            outlined
            rounded
            hide-details
            :value="filter.searchTerm"
            :placeholder="$t('bacteria.filter.search')"
            @input="value => debouncedApplyFilter('searchTerm', value)"
          >
            <template #append>
              <search-icon />
            </template>
          </v-text-field>
        </v-col>
        <v-col md="4">
          <resistome-autocomplete
            :value="filter.resistomes"
            @input="value => applyFilter('resistomes', value)"
          />
        </v-col>
        <v-col md="2">
          <date-picker
            clearable
            :value="filter.startDate"
            :max="filter.endDate"
            :placeholder="$t('bacteria.filter.start_date')"
            @input="value => applyFilter('startDate', value)"
          />
        </v-col>
        <v-col md="2">
          <date-picker
            left
            clearable
            :value="filter.endDate"
            :min="filter.startDate"
            :placeholder="$t('bacteria.filter.end_date')"
            @input="value => applyFilter('endDate', value)"
          />
        </v-col>
        <v-col md="1">
          <v-btn
            text
            small
            class="caption text-capitalize"
            @click="clearSearch()"
          >
            <DeleteIcon class="mr-2" />
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

import DatePicker from '@/modules/shared/components/DatePicker.vue'
import DeleteIcon from '@/modules/shared/components/icons/DeleteIcon.vue'
import SearchIcon from '@/modules/shared/components/icons/SearchIcon.vue'
import ResistomeAutocomplete from './ResistomeAutocomplete.vue'

const BacteriaModule = namespace('bacteria')

@Component({
  components: {
    DatePicker,
    DeleteIcon,
    ResistomeAutocomplete,
    SearchIcon,
  },
})
export default class ExperimentFilter extends Vue {
  @BacteriaModule.State
  private readonly filter!: BacteriaFilter

  @BacteriaModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

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

    newFilter.type = this.filter.type

    this.fetchExperiments(newFilter)
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
