<template>
  <v-dialog max-width="800" v-model="isOpen">
    <v-card v-if="isOpen">
      <v-card-title class="px-10 pt-8">
        {{ $t('shared.edit_profile') }}
      </v-card-title>

      <v-card-text class="px-10">
        <v-form
          lazy-validation
          ref="form"
          class="contact-form"
        >
          <v-container pa-0>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  required
                  rounded
                  hide-details="auto"
                  :rules="[required]"
                  :label="$t('admin.user.form.fields.name')"
                  v-model="model.name"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  required
                  rounded
                  hide-details="auto"
                  :rules="[required]"
                  :label="$t('admin.user.form.fields.email')"
                  v-model="model.email"
                />
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  required
                  rounded
                  hide-details="auto"
                  :rules="[required]"
                  :label="$t('admin.user.form.fields.user')"
                  v-model="model.username"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  rounded
                  hide-details="auto"
                  type="password"
                  :rules="[minLength(6, $t('admin.user.form.fields.password.error.min'))]"
                  :label="$t('admin.user.form.fields.password.label')"
                  v-model="model.password"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  rounded
                  hide-details="auto"
                  type="password"
                  :rules="[confirmed]"
                  :label="$t('admin.user.form.fields.re_password.label')"
                  v-model="rePassword"
                />
              </v-col>

              <v-col cols="12" xs="12" v-if="species.length">
                <h2 class="subtitle-2 font-weight-bold">
                  {{ $t('admin.user.form.fields.species') }}
                </h2>
                <v-row no-gutters>
                  <v-checkbox
                    color="#BBBBBB"
                    v-for="(specie, index) in species"
                    v-model="model.species"
                    :value="specie"
                    :label="specie.name"
                    :key="specie.id"
                    :class="{'mr-7': index!=(species.length-1)}"
                    :disabled="!isAdmin"
                    :value-comparator="(a, b) => a.id === b.id"
                  />
                </v-row>
              </v-col>

              <v-col cols="12" xs="12" v-if="isAdmin">
                <h2 class="subtitle-2 font-weight-bold">
                  {{ $t('shared.status') }}
                </h2>
                <v-radio-group
                  mandatory
                  row
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
        <v-spacer />
        <v-btn
          large
          text
          rounded
          class="mr-4"
          @click="isOpen = false"
        >
          {{ $t('admin.user.form.actions.discard') }}
        </v-btn>
        <primary-button invert @click="submit()">
          {{ $t('admin.user.form.actions.save') }}
        </primary-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component, Mixins, Model, Watch,
} from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import ValidatorMixin from '@/modules/shared/mixins/ValidatorMixin'

import UserModel from '@/modules/shared/entities/form-models/User'

import DeleteIcon from '@/modules/shared/components/icons/DeleteIcon.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

const AuthModule = namespace('auth')
const SharedModule = namespace('shared')

@Component({
  components: {
    DeleteIcon,
    PrimaryButton,
  },
})
export default class ProfileForm extends Mixins(ValidatorMixin) {
  @Model('input', { default: null, required: true })
  private model!: UserModel|null

  @AuthModule.Getter
  private readonly isAdmin!: boolean

  @SharedModule.Getter
  private readonly species!: unknown[]

  @SharedModule.Action
  private readonly updateUser!: (user: UserModel) => Promise<void>

  @Watch('model.password')
  changePassword(val: string) {
    if (val === '') this.resetValidation()
  }

  private rePassword = ''

  private get isOpen(): boolean {
    return this.model !== null
  }

  private set isOpen(open: boolean) {
    if (open === false) {
      this.reset()
      this.$emit('input', null)
    }
  }

  private confirmed(val: string) {
    return (this.model?.password === val) || this.$i18n.t('admin.user.form.fields.re_password.error.not_match')
  }

  private async submit() {
    if (!this.validate()) return

    try {
      await this.updateUser(this.model!)

      this.isOpen = false
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
