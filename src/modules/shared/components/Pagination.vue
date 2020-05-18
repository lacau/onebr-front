<template>
  <v-pagination
    circle
    color="secondary"
    v-bind="$attrs"
    v-on="$listeners"
    :total-visible="7"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class Pagination extends Vue {}
</script>

<style lang="scss">
$pagination-box-shadow: none !important;
$pagination-item-text-color: #000064 !important;

.v-pagination {
  &__item, &__navigation {
    box-shadow: $pagination-box-shadow;
  }

  &__item {
    color: $pagination-item-text-color;
  }
}
</style>
