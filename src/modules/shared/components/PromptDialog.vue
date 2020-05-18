<template>
  <v-dialog
    persistent
    content-class="v-dialog--top"
    width="430"
    :value="value"
    @input="cancel($event)"
  >
    <template #activator="slotProps">
      <slot name="activator" v-bind="slotProps" />
    </template>

    <v-sheet class="pa-10">
      <h2 class="subtitle-1 font-weight-medium">
        {{ message }}
      </h2>

      <v-form
        lazy-validation
        ref="form"
      >
        <v-text-field
          outlined
          required
          rounded
          v-model="inputValue"
          :rules="[required]"
        />
      </v-form>

      <div class="text-right">
        <v-btn rounded text class="mr-2" @click="confirm()">
          {{ $t('shared.actions.proceed') }}
        </v-btn>
        <v-btn rounded depressed color="primary"  @click="cancel(!value)">
          {{ $t('shared.actions.cancel') }}
        </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import ValidatorMixin from '@/modules/shared/mixins/ValidatorMixin'

@Component
export default class PromptDialog extends Mixins(ValidatorMixin) {
  @Prop()
  private readonly value!: unknown

  @Prop({ required: true })
  private readonly message!: string

  private inputValue = ''

  private confirm() {
    if (!this.validate()) return

    this.$emit('confirm', this.inputValue)
    this.reset()
  }

  private cancel(value: unknown) {
    this.reset()
    this.$emit('input', value)
  }
}
</script>
