<template>
  <v-dialog
    hide-overlay
    content-class="menu-dialog"
    transition="scroll-y-transition"
    :value="value"
    @input="$emit('input', $event)"
  >
    <template #activator="slotProps">
      <slot v-bind="slotProps" />
    </template>

    <Menu @close="$emit('input', false)" />
  </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Menu from './Menu.vue'

@Component({
  components: {
    Menu,
  },
})
export default class MenuDialog extends Mixins(ViewDataMixin) {
  @Prop({ type: Boolean }) value!: boolean;

  viewDataScope = ViewDataScope.menu
}
</script>

<style lang="scss">
.menu-dialog.v-dialog {
  align-self: flex-start;
  border-radius: 0;
  box-shadow: none;
  flex: 0 1 auto;
  margin: 0;
  overflow: visible;
}
</style>
