<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    rounded
    large
    depressed
    :outlined="!invert"
    color="primary"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class PrimaryButton extends Vue {
  @Prop({ default: false, type: Boolean }) private invert!: boolean
}
</script>
