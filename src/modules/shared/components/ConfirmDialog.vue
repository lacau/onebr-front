<template>
  <v-dialog
    persistent
    content-class="v-dialog--top"
    width="430"
    :value="value"
    @input="$emit('input', $event)"
  >
    <template #activator="slotProps">
      <slot name="activator" v-bind="slotProps" />
    </template>

    <v-sheet class="pa-10">
      <h2 class="subtitle-1 font-weight-medium">
        {{ title }}
      </h2>

      <p class="body-2 mt-4 mb-8">
        {{ message }}
      </p>

      <div class="text-right">
        <v-btn rounded text class="mr-2" @click="$emit('confirm')">
          {{ $t('shared.actions.proceed') }}
        </v-btn>
        <v-btn rounded depressed color="primary" @click="$emit('cancel')">
          {{ $t('shared.actions.cancel') }}
        </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ConfirmDialog extends Vue {
  @Prop()
  private readonly value!: unknown

  @Prop({ required: true })
  private readonly title!: string

  @Prop({ default: '' })
  private readonly message!: string
}
</script>
