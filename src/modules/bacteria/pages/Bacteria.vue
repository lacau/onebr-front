<template>
  <div class="bacteria-page pa-0">
    <bacteria-map />

    <experiment-filter />

    <experiment-table class="experiment-table" />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'

import AppFooter from '@/modules/shared/components/AppFooter.vue'
import BacteriaMap from '../components/map/BacteriaMap.vue'
import ExperimentFilter from '../components/filter/ExperimentFilter.vue'
import ExperimentTable from '../components/table/ExperimentTable.vue'

const BacteriaModule = namespace('bacteria')

@Component({
  components: {
    AppFooter,
    BacteriaMap,
    ExperimentFilter,
    ExperimentTable,
  },
})
export default class Bacteria extends Vue {
  @BacteriaModule.Action
  private readonly fetchCoordinates!: (bacteria: string) => Promise<void>

  @BacteriaModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

  @Watch('$route.params.name')
  private changeBacteria() {
    this.fetchData()
  }

  mounted() {
    this.fetchData()
  }

  private fetchData() {
    const map: { [key: string]: string } = {
      KpBr: 'KP_BR',
      SeBr: 'SE_BR',
      EcBr: 'EC_BR',
    }
    const { name } = this.$route.params
    const bacteria = map[name]
    const filter = new BacteriaFilter({ type: bacteria })

    this.fetchExperiments(filter)
    this.fetchCoordinates(bacteria)
  }

  created() {
    this.disablePageScroll()
  }

  destroyed() {
    this.enablePageScroll()
  }

  private disablePageScroll() {
    this.setOverflow('hidden')
  }

  private enablePageScroll() {
    this.setOverflow()
  }

  private setOverflow(overflow = '') {
    const html = document.querySelector('html')
    if (html) {
      html.style.overflow = overflow
    }
  }
}
</script>

<style lang="scss" scoped>
.bacteria-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow: hidden;

  .experiment-table {
    flex-grow: 1;
    overflow-y: scroll;
  }
}
</style>
