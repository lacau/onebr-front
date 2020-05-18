<template>
  <v-autocomplete
    cache-items
    chips
    clearable
    eager
    hide-details
    hide-no-data
    multiple
    outlined
    rounded
    small-chips
    item-text="name"
    item-value="id"
    :value="value"
    :items="resistomes"
    :loading="loading"
    :search-input.sync="search"
    :placeholder="placeholder || $t('bacteria.filter.resistome')"
    :return-object="returnObject"
    :menu-props="{
      nudgeBottom: 10,
      transition: 'slide-y-transition'
    }"
    @input="$emit('input', $event)"
  >
    <template #selection="data">
      <v-chip
        close
        close-icon="close"
        class="caption secondary primary--text ma-0 mr-2"
        v-if="data.index <= maxVisible"
        v-bind="data.attrs"
        :outlined="data.index == maxVisible"
        :input-value="data.selected"
        @click="data.select"
        @click:close="removeResistome(data.index)"
      >
        <span v-if="data.index == maxVisible" class="font-weight-bold">
          + {{ value.length - data.index }}
        </span>
        <span v-else>
          {{ data.item.name }}
        </span>
      </v-chip>
    </template>

    <template #item="{ item }">
      <v-list-item-content>
        <v-list-item-title class="caption">
          {{ item.name }}
        </v-list-item-title>
      </v-list-item-content>
    </template>

    <template #append>
      <slot name="icon">
        <bacteria-icon />
      </slot>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import {
  Component, Watch, Prop, Vue,
} from 'vue-property-decorator'

import { debounce } from '@/modules/shared/utils/functions'

import BacteriaFilterService from '@/modules/shared/services/BacteriaFilterService'

import BacteriaIcon from '@/modules/shared/components/icons/BacteriaIcon.vue'

@Component({
  components: {
    BacteriaIcon,
  },
})
export default class ResistomeAutocomplete extends Vue {
  @Prop({ default: () => [], type: Array })
  private readonly value!: unknown[]

  @Prop({ default: 2 })
  private readonly maxVisible!: number

  @Prop({ default: false, type: Boolean })
  private readonly returnObject!: boolean

  @Prop()
  private readonly placeholder!: string

  @Prop()
  private readonly type!: string

  private search = null

  private resistomes = this.value

  private loading = false

  @Watch('search')
  private readonly debouncedGetResistomes = debounce(this.getResistomes, 750);

  private async getResistomes(search: string) {
    if (!search) return

    this.loading = true
    try {
      const { data } = await BacteriaFilterService.getResistomes(search, this.type)

      this.resistomes = Object.entries(data).reduce((acc: unknown[], [k, v]) => {
        if (Array.isArray(v) && v.length) {
          acc.push({ header: this.$t(`bacteria.resistome.${k}`) })
          return [
            ...acc,
            ...v,
            { divider: true },
          ]
        }

        return acc
      }, [])
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  }

  private removeResistome(index: number) {
    const deleteCount = (index === this.maxVisible) ? Infinity : 1
    const copyValue = [...this.value]

    copyValue.splice(index, deleteCount)

    this.$emit('input', copyValue)
  }
}
</script>
