<template>
  <v-dialog
    content-class="v-dialog--top"
    width="491"
    :value="value"
    @input="$emit('input', $event)"
    @click:outside="close"
  >
    <v-sheet class="pa-8 pb-3">
      <table class="body-2">
        <tr v-for="[key, value] in resistomeEntries" :key="key">
          <th class="font-weight-bold text-no-wrap">
            {{ $t(`bacteria.resistome.${key}`) }}
          </th>
          <td class="pl-2 pb-5">
            {{ value }}
          </td>
        </tr>
      </table>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Resistome from '@/modules/shared/entities/Resistome'

const BacteriaModule = namespace('bacteria')

@Component
export default class ResistomeDialog extends Vue {
  @Prop({ default: false })
  private readonly value!: boolean

  @BacteriaModule.State
  private readonly resistome!: Resistome|null

  @BacteriaModule.Mutation
  private readonly setResistome!: (resistome: Resistome|null) => void

  private get resistomeEntries() {
    return Object.entries(this.resistome ?? {}).filter((e) => e[1] !== '-')
  }

  private close() {
    setTimeout(() => this.setResistome(null), 270)
  }
}
</script>

<style lang="scss" scoped>
th {
  vertical-align: baseline;
}
</style>
