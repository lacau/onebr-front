<template>
  <section class="dialog-section">
    <v-divider />

    <slot name="title">
      <h2 class="dialog-section__title" v-if="title">
        {{ title }}
      </h2>
    </slot>

    <div class="body-2">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DialogSection extends Vue {
  @Prop()
  private readonly title!: string
}
</script>

<style lang="scss" scoped>
.dialog-section {
  page-break-inside: avoid;
  padding-top: 24px;

  hr {
    margin-bottom: 36px;
  }

  &__title {
    color: #81B7FF;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 14px;
  }
}
</style>
