<template>
  <div class="bacteria-menu">
    <v-select
      hide-details
      hide-selected
      rounded
      append-icon="keyboard_arrow_down"
      background-color="white"
      height="50"
      item-value="name"
      v-model="currentBacteria"
      :items="bacteria"
      :menu-props="menuProps"
    >
      <template #selection="{ item }">
        <component class="mr-2" :is="`${item.name}Icon`" />
        <span class="subtitle-2 font-italic">
          {{ item.scientificName }}
        </span>
      </template>
      <template #item="{ item }">
        <component class="mr-2" :is="`${item.name}Icon`" />
        <span class="subtitle-2 font-italic">
          {{ item.scientificName }}
        </span>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Bacteria from '@/modules/shared/entities/Bacteria'

import EcBrIcon from '@/modules/shared/components/icons/EcBrIcon.vue'
import KpBrIcon from '@/modules/shared/components/icons/KpBrIcon.vue'
import SeBrIcon from '@/modules/shared/components/icons/SeBrIcon.vue'

const SharedModule = namespace('shared')

@Component({
  components: {
    EcBrIcon,
    KpBrIcon,
    SeBrIcon,
  },
})
export default class BacteriaMenu extends Vue {
  @SharedModule.State
  private readonly bacteria!: Bacteria[]

  private get currentBacteria() {
    return this.$route.params.name
  }

  private set currentBacteria(name: string) {
    this.$router.replace({ params: { name } })
  }

  private get menuProps() {
    return {
      nudgeTop: -10,
      offsetY: true,
      transition: 'slide-y-transition',
    }
  }
}
</script>

<style lang="scss">
.bacteria-menu {
  width: 290px;
}
</style>
