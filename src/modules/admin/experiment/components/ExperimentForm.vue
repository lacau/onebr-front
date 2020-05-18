<template>
  <v-dialog max-width="850" v-model="isOpen">
    <v-card v-if="isOpen">
      <v-card-title class="px-10 pt-8">
        {{ $t(`admin.experiment.form.title.${isEditing ? 'edit' : 'new'}`) }}
      </v-card-title>

      <v-card-text class="px-10">
        <v-form
          lazy-validation
          ref="form"
          class="contact-form"
        >
          <v-container pa-0>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  required
                  rounded
                  hide-details="auto"
                  :label="$t('admin.experiment.form.fields.id')"
                  :rules="[required]"
                  v-model="model.identification"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  required
                  rounded
                  hide-details="auto"
                  :label="$t('admin.experiment.form.fields.barcode')"
                  :rules="[required]"
                  v-model="model.barcode"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  clearable
                  outlined
                  rounded
                  return-object
                  item-text="name"
                  item-value="id"
                  style="max-width: 240px"
                  hide-details="auto"
                  :label="$t('admin.experiment.form.fields.specie')"
                  :items="species"
                  :rules="[required]"
                  v-model="model.specie"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  clearable
                  outlined
                  rounded
                  hide-details
                  return-object
                  item-text="name"
                  item-value="id"
                  :label="$t('admin.experiment.form.fields.country')"
                  :items="countries"
                  v-model="country"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-autocomplete
                  clearable
                  outlined
                  rounded
                  hide-details
                  return-object
                  item-text="name"
                  item-value="id"
                  :label="$t('admin.experiment.form.fields.city')"
                  :items="cities"
                  v-model="model.city"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  clearable
                  outlined
                  rounded
                  hide-details
                  return-object
                  item-text="name"
                  item-value="id"
                  :label="$t('admin.experiment.form.fields.region')"
                  :items="regions"
                  v-model="model.region"
                />
              </v-col>
              <v-col cols="12" sm="4" md="3">
                <v-text-field
                  hide-details
                  outlined
                  required
                  rounded
                  type="number"
                  :label="$t('admin.experiment.form.fields.lat')"
                  v-model.number="model.geolocation_lat"
                />
              </v-col>
              <v-col cols="12" sm="4" md="3">
                <v-text-field
                  hide-details
                  outlined
                  required
                  rounded
                  type="number"
                  :label="$t('admin.experiment.form.fields.long')"
                  v-model.number="model.geolocation_long"
                />
              </v-col>
              <v-col cols="12" sm="4" md="3">
                <date-picker
                  clearable
                  :label="$t('admin.experiment.form.fields.date')"
                  v-model="model.date"
                />
              </v-col>
              <v-col cols="12" sm="3" md="3">
                <v-text-field
                  hide-details
                  outlined
                  required
                  rounded
                  :label="$t('admin.experiment.form.fields.host')"
                  v-model="model.host"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  clearable
                  outlined
                  rounded
                  hide-details
                  return-object
                  item-text="name"
                  item-value="id"
                  :label="$t('admin.experiment.form.fields.origin')"
                  :items="origin"
                  v-model="model.origin"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  clearable
                  outlined
                  rounded
                  hide-details
                  return-object
                  item-text="name"
                  item-value="id"
                  :label="$t('admin.experiment.form.fields.source')"
                  :items="source"
                  v-model="model.source"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  clearable
                  outlined
                  rounded
                  hide-details
                  :label="$t('admin.experiment.form.fields.st')"
                  :items="st"
                  v-model="model.st"
                />
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  outlined
                  required
                  rounded
                  hide-details="auto"
                  :label="$t('admin.experiment.form.fields.researcher')"
                  :rules="[required]"
                  v-model="model.researcher_name"
                />
              </v-col>
            </v-row>
          </v-container>

          <dialog-section :title="$t('admin.experiment.form.section.antibiogram')">
            <v-row no-gutters class="mb-n8">
              <v-col
                cols="12"
                sm="3"
                class="mb-8"
                v-for="(group, index) in antibiogramGroup"
                :key="index"
              >
                <v-radio-group
                  row
                  hide-details
                  class="antibiogram mt-0"
                  v-for="field in group"
                  v-model="model.antibiogram[field]"
                  :label="$t(`admin.experiment.form.fields.${field}`)"
                  :key="field"
                >
                  <v-radio
                    class="font-weight-bold"
                    color="#BBBBBB"
                    label="S"
                    value="S"
                  />
                  <v-radio
                    class="font-weight-bold"
                    color="#BBBBBB"
                    label="R"
                    value="R"
                  />
                </v-radio-group>
              </v-col>
            </v-row>
          </dialog-section>

          <dialog-section :title="$t('admin.experiment.form.section.genomic_information')">
            <v-container pa-0>
              <v-row class="mt-n3">
                <v-col cols="12" sm="4">
                  <v-autocomplete
                    clearable
                    outlined
                    rounded
                    hide-details
                    return-object
                    item-text="name"
                    item-value="id"
                    :label="$t('admin.experiment.form.fields.sequencer')"
                    :items="sequencer"
                    v-model="model.sequencer"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    hide-details
                    outlined
                    required
                    rounded
                    :label="$t('admin.experiment.form.fields.assembler')"
                    v-model="model.assembler"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    hide-details
                    outlined
                    required
                    rounded
                    type="number"
                    :label="$t('admin.experiment.form.fields.genome_bp')"
                    v-model.number="model.genome_bp"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    hide-details
                    outlined
                    required
                    rounded
                    type="number"
                    :label="$t('admin.experiment.form.fields.contigs_no')"
                    v-model.number="model.contigs_no"
                  />
                </v-col>
                <v-col cols="12" sm="5" md="4">
                  <v-text-field
                    hide-details
                    outlined
                    required
                    rounded
                    :label="$t('admin.experiment.form.fields.access_no_gb')"
                    v-model="model.access_no_gb"
                  />
                </v-col>
              </v-row>
            </v-container>
          </dialog-section>

          <dialog-section :title="$t('admin.experiment.form.section.resistome')">
            <v-row
              no-gutters
              align="center"
              class="mb-3"
              v-for="field in resistomeFields"
              :key="field.name"
            >
              <v-col class="flex-grow-0 flex-shrink-0">
                <label class="d-block" style="width: 150px;">
                  {{ $t(`admin.experiment.form.fields.${field.name}.label`) }}
                </label>
              </v-col>
              <v-col>
                <resistome-autocomplete
                  return-object
                  v-model="model.resistome[`${field.name}_set`]"
                  :type="field.type"
                  :max-visible="3"
                  :placeholder="$t(`admin.experiment.form.fields.${field.name}.placeholder`)"
                >
                  <template #icon>
                    <search-icon />
                  </template>
                </resistome-autocomplete>
              </v-col>
            </v-row>
          </dialog-section>

          <dialog-section :title="$t('admin.experiment.form.section.heavy_metal')">
            <v-autocomplete
              clearable
              outlined
              rounded
              hide-details
              multiple
              return-object
              item-text="name"
              item-value="id"
              :label="$t('admin.experiment.form.fields.heavy_metal')"
              :items="heavyMetal"
              v-model="model.heavy_metal"
            />
          </dialog-section>

          <dialog-section :title="$t('admin.experiment.form.section.virulome')">
            <v-autocomplete
              clearable
              hide-details
              multiple
              outlined
              return-object
              rounded
              item-text="name"
              item-value="id"
              :label="$t('admin.experiment.form.fields.virulome')"
              :items="virulome"
              v-model="model.virulomes"
            />
          </dialog-section>

          <v-container fluid pa-0>
            <v-row no-gutters>
              <v-col md="6">
                <dialog-section :title="$t('admin.experiment.form.section.k_locus')">
                  <v-autocomplete
                    clearable
                    outlined
                    rounded
                    hide-details="auto"
                    style="max-width: 160px;"
                    :label="$t('admin.experiment.form.fields.k_locus')"
                    :items="kLocus"
                    :rules="[required]"
                    v-model="model.klocus"
                  />
                </dialog-section>
              </v-col>
              <v-col>
                <dialog-section :title="$t('admin.experiment.form.section.wzi')">
                  <v-autocomplete
                    clearable
                    outlined
                    rounded
                    hide-details
                    style="max-width: 160px;"
                    :label="$t('admin.experiment.form.fields.wzi')"
                    :items="wzi"
                    v-model="model.wzi"
                  />
                </dialog-section>
              </v-col>
              <v-col>
                <dialog-section :title="$t('admin.experiment.form.section.wzc')">
                  <v-autocomplete
                    clearable
                    outlined
                    rounded
                    hide-details
                    style="max-width: 160px"
                    :label="$t('admin.experiment.form.fields.wzc')"
                    :items="wzc"
                    v-model="model.wzc"
                  />
                </dialog-section>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid pa-0>
            <v-row no-gutters>
              <v-col>
                <dialog-section :title="$t('admin.experiment.form.section.serotype')">
                  <v-container pa-0 pr-5>
                    <v-row class="mt-n3">
                      <v-col>
                        <v-autocomplete
                          clearable
                          outlined
                          rounded
                          hide-details
                          return-object
                          item-text="name"
                          item-value="id"
                          :label="$t('admin.experiment.form.fields.antigen_o')"
                          :items="antigenO"
                          v-model="model.serotype.antigen_o"
                        />
                      </v-col>
                      <v-col>
                        <v-autocomplete
                          clearable
                          outlined
                          rounded
                          hide-details
                          return-object
                          item-text="name"
                          item-value="id"
                          :label="$t('admin.experiment.form.fields.antigen_h')"
                          :items="antigenH"
                          v-model="model.serotype.antigen_h"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </dialog-section>
              </v-col>
              <v-col>
                <dialog-section :title="$t('admin.experiment.form.section.fim_type')">
                  <v-autocomplete
                    clearable
                    outlined
                    rounded
                    hide-details="auto"
                    :label="$t('admin.experiment.form.fields.fim_type')"
                    style="max-width: 200px;"
                    :items="fimType"
                    :rules="[required]"
                    v-model="model.fim_type"
                  />
                </dialog-section>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid pa-0>
            <v-row no-gutters>
              <v-col>
                <dialog-section :title="$t('admin.experiment.form.section.clermont_typing')">
                  <v-autocomplete
                    clearable
                    outlined
                    rounded
                    return-object
                    style="max-width: 220px"
                    item-text="name"
                    item-value="id"
                    hide-details="auto"
                    :label="$t('admin.experiment.form.fields.clermont_typing')"
                    :items="clermontTyping"
                    :rules="[required]"
                    v-model="model.clermont_typing"
                  />
                </dialog-section>
              </v-col>
              <v-col>
                <dialog-section :title="$t('admin.experiment.form.section.serovar')">
                  <v-autocomplete
                    clearable
                    outlined
                    rounded
                    hide-details
                    return-object
                    style="max-width: 220px"
                    item-text="name"
                    item-value="id"
                    :label="$t('admin.experiment.form.fields.serovar')"
                    :items="serovar"
                    v-model="model.serovar"
                  />
                </dialog-section>
              </v-col>
            </v-row>
          </v-container>

          <dialog-section :title="$t('admin.experiment.form.section.plasmidome')">
            <v-autocomplete
              clearable
              hide-details
              multiple
              outlined
              return-object
              rounded
              item-text="name"
              item-value="id"
              :label="$t('admin.experiment.form.fields.plasmidome')"
              :items="plasmidome"
              v-model="model.plamidomes"
            />
          </dialog-section>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-10 pb-9 pt-5">
        <confirm-dialog
          :title="$t('admin.experiment.form.confirm_delete_title')"
          :message="$t('admin.experiment.form.confirm_delete_message')"
          v-model="confirmDialog"
          @cancel="confirmDialog = false"
          @confirm="deleteExperiment(model.id)"
        >
          <template #activator="{ on }">
            <v-btn
              text
              large
              rounded
              class="body-2 text-capitalize ml-n3"
              v-if="isAdmin && isEditing"
              v-on="on"
            >
              <delete-icon class="mr-2" />
              {{ $t('admin.experiment.form.actions.delete') }}
            </v-btn>
          </template>
        </confirm-dialog>

        <v-spacer />

        <v-btn
          large
          text
          rounded
          class="mr-4"
          @click="isOpen = false"
        >
          {{ $t('admin.experiment.form.actions.discard') }}
        </v-btn>

        <primary-button invert @click="submit()">
          {{ $t('admin.experiment.form.actions.save') }}
        </primary-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import ValidatorMixin from '@/modules/shared/mixins/ValidatorMixin'

import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'
import ExperimentModel from '@/modules/shared/entities/form-models/Experiment'
import Country from '@/modules/shared/entities/form-models/Country'

import ConfirmDialog from '@/modules/shared/components/ConfirmDialog.vue'
import DatePicker from '@/modules/shared/components/DatePicker.vue'
import DeleteIcon from '@/modules/shared/components/icons/DeleteIcon.vue'
import DialogSection from '@/modules/shared/components/DialogSection.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import SearchIcon from '@/modules/shared/components/icons/SearchIcon.vue'
// TODO: export this component to shared module
import ResistomeAutocomplete from '@/modules/bacteria/components/filter/ResistomeAutocomplete.vue'

const AdminExperimentModule = namespace('admin_experiment')
const AuthModule = namespace('auth')

@Component({
  components: {
    ConfirmDialog,
    DatePicker,
    DeleteIcon,
    DialogSection,
    PrimaryButton,
    ResistomeAutocomplete,
    SearchIcon,
  },
})
export default class ExperimentForm extends Mixins(ValidatorMixin) {
  @AuthModule.Getter
  private readonly isAdmin!: boolean

  @AdminExperimentModule.Getter
  private readonly formModel!: ExperimentModel

  @AdminExperimentModule.Getter
  private readonly species!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly plasmidome!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly antigenH!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly antigenO!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly virulome!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly heavyMetal!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly serovar!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly clermontTyping!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly sequencer!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly source!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly origin!: BacteriaFilterItem[]

  @AdminExperimentModule.Getter
  private readonly kLocus!: string[]

  @AdminExperimentModule.Getter
  private readonly wzi!: string[]

  @AdminExperimentModule.Getter
  private readonly wzc!: string[]

  @AdminExperimentModule.Getter
  private readonly fimType!: string[]

  @AdminExperimentModule.Getter
  private readonly st!: string[]

  @AdminExperimentModule.Getter
  private readonly countries!: string[]

  @AdminExperimentModule.Getter
  private readonly cities!: string[]

  @AdminExperimentModule.Getter
  private readonly regions!: string[]

  @AdminExperimentModule.Mutation
  private readonly setFormModel!: (formModel: ExperimentModel|null) => Promise<void>

  @AdminExperimentModule.Action
  private readonly removeExperiment!: (id: number) => Promise<void>

  @AdminExperimentModule.Action
  private readonly saveExperiment!: (formModel: ExperimentModel|null) => Promise<void>

  @Watch('formModel')
  updateModel(newValue: ExperimentModel|null = null) {
    if (newValue === null) {
      this.model = newValue
    } else {
      this.model = newValue?.clone()
      this.country = this.formModel.city.country
    }
  }

  private model: ExperimentModel|null = null

  private country: Country|undefined = undefined

  private confirmDialog = false

  private get isOpen(): boolean {
    return this.model !== null
  }

  private set isOpen(open: boolean) {
    if (open === false) {
      this.setFormModel(null)
    }
  }

  private get isEditing(): boolean {
    return !!this.model?.id
  }

  private resistomeFields = [
    { name: 'blactam', type: 'B_LACTAM' },
    { name: 'aminoglycoside', type: 'AMINOGLYCOSIDE' },
    { name: 'tetracycline', type: 'TETRACYCLINE' },
    { name: 'colistin', type: 'COLISTIN' },
    { name: 'quinolone', type: 'QUINOLONE' },
    { name: 'trimethoprim', type: 'TRIMETHOPRIM' },
    { name: 'sulphonamide', type: 'SULPHONAMIDE' },
    { name: 'fusidic_acid', type: 'FUSIDIC_ACID' },
    { name: 'glycopeptide', type: 'GLYCOPEPTIDE' },
    { name: 'oxazolidinone', type: 'OXAZOLIDINONE' },
    { name: 'rifampicin', type: 'RIFAMPICIN' },
    { name: 'phenicol', type: 'PHENICOL' },
    { name: 'fosfomycin', type: 'FOSFOMYCIN' },
    { name: 'nitroimidazole', type: 'NITROIMIDAZOLE' },
    { name: 'macrolide', type: 'MACROLIDE' },
  ]

  private antibiogramGroup = [
    ['mer', 'etp', 'ipm', 'cro'],
    ['caz', 'cfx', 'cpm', 'ctx'],
    ['nal', 'cip', 'amc', 'atm'],
    ['fos', 'ami', 'gen', 'sxt'],
    ['eno', 'chl', 'cep', 'ctf'],
    ['amp', 'tet', 'col'],
  ]

  private deleteExperiment(id: number) {
    this.removeExperiment(id)
    this.confirmDialog = false
  }

  private async submit() {
    if (!this.validate()) return

    try {
      await this.saveExperiment(this.model)

      this.reset()
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss">
.antibiogram legend {
  font-weight: bold;
  width: 55px;
}
</style>
