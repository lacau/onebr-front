<template>
  <div>
    <h1 class="display-2 primary--text" :class="{ dense }">
      {{ title }}
    </h1>
    <p class="body-2 mb-0 mt-2" v-if="subtitle">
      {{ subtitle }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Headline extends Vue {
  @Prop({ required: true })
  private readonly title!: string;

  @Prop()
  private readonly subtitle!: string;

  @Prop({ default: false, type: Boolean })
  private readonly dense!: boolean;
}
</script>

<style lang="scss" scoped>
.dense {
  font-size: 30px !important;
}
</style>
