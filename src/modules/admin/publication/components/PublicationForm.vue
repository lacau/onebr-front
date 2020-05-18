<template>
  <v-dialog max-width="800" v-model="isOpen">
    <v-card v-if="isOpen">
      <v-card-title class="px-10 pt-8">
        {{ $t(`admin.publication.form.title.${isEditing ? 'edit' : 'new'}`) }}
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
                <v-select
                  outlined
                  rounded
                  hide-details="auto"
                  :label="$t('admin.publication.form.fields.type')"
                  :rules="[required]"
                  :items="types"
                  v-model="model.type"
                />
              </v-col>
              <v-col cols="12" sm="4" v-if="isAdmin">
                <v-text-field
                  outlined
                  rounded
                  hide-details
                  type="number"
                  :label="$t('admin.publication.form.fields.order')"
                  v-model.number="model.order"
                />
              </v-col>
              <v-col cols="12" :sm="isAdmin ? 4 : 3">
                <DatePicker
                  :label="$t('admin.publication.form.fields.date')"
                  v-model="model.date"
                />
              </v-col>
              <v-col cols="12" :sm="isAdmin ? 12 : 5">
                <v-text-field
                  outlined
                  rounded
                  required
                  hide-details="auto"
                  :rules="[required]"
                  :label="$t('admin.publication.form.fields.link')"
                  v-model="model.link"
                />
              </v-col>

              <v-col cols="12" xs="12">
                <v-btn-toggle
                  tile
                  group
                  mandatory
                  active-class="language-selector"
                  v-model="language"
                >
                  <v-btn
                    class="body-2 text-capitalize"
                    value="pt"
                    width="132"
                  >
                    {{ $t('admin.publication.form.fields.portuguese') }}
                  </v-btn>

                  <v-btn
                    class="body-2 text-capitalize"
                    value="en"
                    width="132"
                  >
                    {{ $t('admin.publication.form.fields.english') }}
                  </v-btn>
                </v-btn-toggle>
              </v-col>

              <v-col cols="12" xs="12">
                <v-text-field
                  outlined
                  required
                  rounded
                  hide-details
                  :label="$t('admin.publication.form.fields.title')"
                  v-model="model[`title_${language}`]"
                />
              </v-col>

              <v-col cols="12" xs="12">
                <v-textarea
                  outlined
                  rounded
                  hide-details
                  :label="$t('admin.publication.form.fields.description')"
                  v-model="model[`description_${language}`]"
                />
              </v-col>

              <v-col cols="12" xs="12">
                <h2 class="subtitle-2 font-weight-bold">
                  {{ $t('shared.status') }}
                </h2>
                <v-radio-group
                  mandatory row
                  hide-details
                  v-model="model.active"
                >
                  <v-radio
                    class="mr-7"
                    color="#BBBBBB"
                    :label="$t('shared.active')"
                    :value="true"
                  />
                  <v-radio
                    class="mr-7"
                    color="#BBBBBB"
                    :label="$t('shared.inactive')"
                    :value="false"
                  />
                </v-radio-group>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-10 pb-9 pt-5">
        <confirm-dialog
          :title="$t('admin.publication.form.confirm_delete_title')"
          :message="$t('admin.publication.form.confirm_delete_message')"
          v-model="confirmDialog"
          @cancel="confirmDialog = false"
          @confirm="deletePublication(model.id)"
        >
          <template #activator="{ on }">
            <v-btn
              text large
              rounded
              class="body-2 text-capitalize ml-n3"
              v-if="isEditing"
              v-on="on"
            >
              <delete-icon class="mr-2" />
              {{ $t('admin.publication.form.actions.delete') }}
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
          {{ $t('admin.publication.form.actions.discard') }}
        </v-btn>
        <primary-button invert @click="submit()">
          {{ $t('admin.publication.form.actions.save') }}
        </primary-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import ValidatorMixin from '@/modules/shared/mixins/ValidatorMixin'

import PublicationModel from '@/modules/shared/entities/form-models/Publication'

import ConfirmDialog from '@/modules/shared/components/ConfirmDialog.vue'
import DatePicker from '@/modules/shared/components/DatePicker.vue'
import DeleteIcon from '@/modules/shared/components/icons/DeleteIcon.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

const AuthModule = namespace('auth')
const AdminPublicationModule = namespace('admin_publication')

@Component({
  components: {
    ConfirmDialog,
    DatePicker,
    DeleteIcon,
    PrimaryButton,
  },
})
export default class PublicationForm extends Mixins(ValidatorMixin) {
  @AdminPublicationModule.Getter
  private readonly formModel!: PublicationModel|null

  @AdminPublicationModule.Mutation
  private readonly setFormModel!: (formModel: PublicationModel|null) => Promise<void>

  @AdminPublicationModule.Action
  private readonly removePublication!: (id: number) => Promise<void>

  @AdminPublicationModule.Action
  private readonly savePublication!: (formModel: PublicationModel|null) => Promise<void>

  @AuthModule.Getter
  private readonly isAdmin!: boolean

  @Watch('formModel')
  updateModel(newValue: PublicationModel|null = null) {
    this.model = (newValue === null) ? newValue : newValue?.clone()
  }

  private model: PublicationModel|null = null

  private language = 'pt'

  private confirmDialog = false

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

  private get isOpen(): boolean {
    return this.model !== null
  }

  private set isOpen(open: boolean) {
    if (open === false) {
      this.setFormModel(null)
      this.language = 'pt'
    }
  }

  private get isEditing(): boolean {
    return !!this.model?.id
  }

  private deletePublication(id: number) {
    this.removePublication(id)
    this.confirmDialog = false
  }

  private async submit() {
    if (!this.validate()) return

    try {
      await this.savePublication(this.model)

      this.reset()
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.language-selector {
  border-bottom: 3px solid #9EC8FF !important;
  width: 132px;

  &:before {
    background-color: transparent !important;
  }
}
</style>
