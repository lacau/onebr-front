<template>
  <v-dialog
    content-class="experiment-dialog"
    :value="value"
    v-if="value"
    @input="$emit('input', $event)"
    @click:outside="close"
  >
    <v-sheet
      class="pa-10 experiment-dialog__content"
      width="800"
      height="90vh"
      style="overflow: auto"
    >
      <h2 class="display-1 pb-1">
        {{ experiment.identification }}

        <v-btn
          text
          class="font-weight-medium text-capitalize float-right d-print-none"
          @click="print()"
        >
          <printer-icon class="mr-2" />
          {{ $t('shared.actions.print') }}
        </v-btn>
      </h2>
      <p class="body-2 ma-0">
        {{ experiment.specie }}
      </p>

      <dialog-section id="general">
        <v-container fluid pa-0>
          <v-row no-gutters>
            <v-col>
              {{ $t('bacteria.experiment_dialog.country') }}
              <strong class="d-block mt-1">
                {{ $t('shared.brazil') }}
              </strong>
            </v-col>
            <v-col>
              {{ $t('bacteria.experiment_dialog.city') }}
              <strong class="d-block mt-1">
                {{ experiment.city }}
              </strong>
            </v-col>
            <v-col>
              {{ $t('bacteria.experiment_dialog.region') }}
              <strong class="d-block mt-1">
                {{ experiment.region }}
              </strong>
            </v-col>
            <v-col>
              {{ $t('bacteria.experiment_dialog.date') }}
              <strong class="d-block mt-1">
                {{ experiment.date }}
              </strong>
            </v-col>
          </v-row>
          <v-row no-gutters class="pt-4">
            <v-col>
              {{ $t('bacteria.experiment_dialog.origin') }}
              <strong class="d-block mt-1">
                {{ experiment.origin }}
              </strong>
            </v-col>
            <v-col>
              {{ $t('bacteria.experiment_dialog.host') }}
              <strong class="d-block mt-1">
                {{ experiment.host }}
              </strong>
            </v-col>
            <v-col>
              {{ $t('bacteria.experiment_dialog.source') }}
              <strong class="d-block mt-1">
                {{ experiment.source }}
              </strong>
            </v-col>
            <v-col>
              <v-spacer />
            </v-col>
          </v-row>
        </v-container>
      </dialog-section>

      <dialog-section id="antibiogram" :title="$t('bacteria.experiment_dialog.antibiogram')">
        <v-container fluid pa-0 font-weight-bold>
          <v-row no-gutters>
            <v-col md="2" v-for="(v, k) in experiment.antibiogram" :key="k">
              <span class="w-48">
                {{ $t(`bacteria.experiment_dialog.${k}`) }}
              </span>
              {{ v || '-' }}
            </v-col>
          </v-row>
        </v-container>

        <p
          class="ma-0 mt-4 caption"
          v-html="$t('bacteria.experiment_dialog.report')"
        />
      </dialog-section>

      <dialog-section id="genomic_information" :title="$t('bacteria.experiment_dialog.genomic_information')">
        <v-container fluid pa-0>
          <v-row no-gutters>
            <v-col>
              {{ $t('bacteria.experiment_dialog.sequencer') }}
              <strong class="d-block mt-1">
                {{ experiment.sequencer }} <br />
                {{ $d(experiment.sequencingDate, 'short') }}
              </strong>
            </v-col>
            <v-col>
              {{ $t('bacteria.experiment_dialog.assembler') }}
              <strong class="d-block mt-1">
                {{ experiment.assembler }} <br />
                {{ $d(experiment.dateOfAssembly, 'short') }}
              </strong>
            </v-col>
            <v-col>
              {{ $t('bacteria.experiment_dialog.genome_bp') }}
              <strong class="d-block mt-1">
                {{ experiment.genomeBp || '-' }}
              </strong>
            </v-col>
            <v-col>
             {{ $t('bacteria.experiment_dialog.contigs_no') }}
              <strong class="d-block mt-1">
                {{ experiment.contigsNo || '-' }}
              </strong>
            </v-col>
          </v-row>
          <v-row no-gutters class="pt-4">
            <v-col>
              {{ $t('bacteria.experiment_dialog.access_no_gb') }}
              <strong class="d-block mt-1">
                {{ experiment.accessNoGb }}
              </strong>
            </v-col>
          </v-row>
        </v-container>
      </dialog-section>

      <dialog-section id="st" :title="$t('bacteria.experiment_dialog.st')">
        {{ experiment.st }}
      </dialog-section>

      <dialog-section id="resistome" :title="$t('bacteria.experiment_dialog.resistome')">
        <v-container fluid pa-0>
          <v-row no-gutters>
            <v-col md="6" v-for="(v, k) in experiment.resistome" :key="k">
              <v-row no-gutters>
                <v-col>{{ $t(`bacteria.resistome.${k}`) }}</v-col>
                <v-col class="mr-2">{{ v }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </dialog-section>

      <dialog-section id="heavy_metal" :title="$t('bacteria.experiment_dialog.heavy_metal')">
        {{ experiment.heavyMetal }}
      </dialog-section>

      <dialog-section id="virulome" :title="$t('bacteria.experiment_dialog.virulome')">
        {{ experiment.virulome }}
      </dialog-section>

      <v-container fluid pa-0>
        <v-row no-gutters>
          <v-col md="6">
            <dialog-section id="k_locus" :title="$t('bacteria.experiment_dialog.k_locus')">
              {{ experiment.kLocus }}
            </dialog-section>
          </v-col>
          <v-col>
            <dialog-section id="wzi" :title="$t('bacteria.experiment_dialog.wzi')">
              {{ experiment.wzi }}
            </dialog-section>
          </v-col>
          <v-col>
            <dialog-section id="wzc" :title="$t('bacteria.experiment_dialog.wzc')">
              {{ experiment.wzc }}
            </dialog-section>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid pa-0>
        <v-row no-gutters>
          <v-col>
            <dialog-section id="serotype" :title="$t('bacteria.experiment_dialog.serotype')">
              <span v-if="experiment.serotype">
                {{ experiment.serotype.antigenO }}:{{ experiment.serotype.antigenH }}
              </span>
              <span v-else>
                -
              </span>
            </dialog-section>
          </v-col>
          <v-col>
            <dialog-section id="fim_type" :title="$t('bacteria.experiment_dialog.fim_type')">
              {{ experiment.fimType }}
            </dialog-section>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid pa-0>
        <v-row no-gutters>
          <v-col>
            <dialog-section id="clermont_typing" :title="$t('bacteria.experiment_dialog.clermont_typing')">
              {{ experiment.clermontTyping }}
            </dialog-section>
          </v-col>
          <v-col>
            <dialog-section id="serovar" :title="$t('bacteria.experiment_dialog.serovar')">
              {{ experiment.serovar }}
            </dialog-section>
          </v-col>
        </v-row>
      </v-container>

      <dialog-section id="plasmidome" :title="$t('bacteria.experiment_dialog.plasmidome')">
        {{ experiment.plasmidome }}
      </dialog-section>
    </v-sheet>

    <v-sheet class="pa-5 ml-3" width="216" height="100%">
      <scrollactive
        exact
        scroll-container-selector=".experiment-dialog__content"
        :modify-url="false"
        :offset="-24"
      >
        <a href="#general" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.general') }}
        </a>
        <a href="#antibiogram" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.antibiogram') }}
        </a>
        <a href="#genomic_information" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.genomic_information') }}
        </a>
        <a href="#st" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.st') }}
        </a>
        <a href="#resistome" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.resistome') }}
        </a>
        <a href="#heavy_metal" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.heavy_metal') }}
        </a>
        <a href="#virulome" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.virulome') }}
        </a>
        <a href="#k_locus" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.k_locus') }}
        </a>
        <a href="#wzi" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.wzi') }}
        </a>
        <a href="#wzc" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.wzc') }}
        </a>
        <a href="#serotype" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.serotype') }}
        </a>
        <a href="#fim_type" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.fim_type') }}
        </a>
        <a href="#clermont_typing" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.clermont_typing') }}
        </a>
        <a href="#serovar" class="subtitle-2 d-block scrollactive-item mb-2">
          {{ $t('bacteria.experiment_dialog.serovar') }}
        </a>
        <a href="#plasmidome" class="subtitle-2 d-block scrollactive-item mb-0">
          {{ $t('bacteria.experiment_dialog.plasmidome') }}
        </a>
      </scrollactive>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Experiment from '@/modules/shared/entities/Experiment'

import PrinterIcon from '@/modules/shared/components/icons/PrinterIcon.vue'
import DialogSection from '@/modules/shared/components/DialogSection.vue'

const BacteriaModule = namespace('bacteria')

@Component({
  components: {
    DialogSection,
    PrinterIcon,
  },
})
export default class ExperimentDialog extends Vue {
  @Prop({ default: false })
  private readonly value!: boolean

  @BacteriaModule.State
  private readonly experiment!: Experiment

  @BacteriaModule.Mutation
  private readonly setExperiment!: (experiment: Experiment) => void

  private close() {
    setTimeout(() => this.setExperiment(Experiment.empty()), 270)
  }

  private print() {
    window.print()
  }
}
</script>

<style lang="scss" scoped>
.w-48 {
  width: 48px;
  display: inline-block;
}

a {
  color: black;
}
</style>

<style lang="scss">
.experiment-dialog {
  box-shadow: none;
  display: flex;
  overflow: hidden;
  width: auto;

  &__content {
    &.pa-10 {
      padding-bottom: 784px !important;
    }
  }
}

@media print {
  .v-dialog__content.v-dialog__content--active {
    height: auto;
    position: static;
  }

  .experiment-dialog__content {
    height: auto !important;
    left: 0 !important;
    position: absolute !important;
    top: 0 !important;
    width: 101% !important;

    &.pa-10 {
      padding-bottom: 40px !important;
    }

    .col-md-2.col {
      min-width: 16.6666666667% !important;
      max-width: 16.6666666667% !important;
    }

    .col-md-6.col {
      min-width: 50% !important;
      max-width: 50% !important;
    }
  }
}
</style>
