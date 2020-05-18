<template>
  <v-overlay opacity="0.2" :value="show">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
      width="3"
    />
  </v-overlay>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ActivityIndicator extends Vue {
  @Prop({ default: false, type: Boolean })
  private readonly show!: boolean
}
</script>
