<template>
  <v-breadcrumbs :items="items">
    <template #item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
        :exact="item.exact"
      >
        <icon
          left
          outlined
          size="24"
          :name="item.icon"
        />
        <span class="v-breadcrumbs__text">
          {{ item.text }}
        </span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Icon from '@/modules/shared/components/Icon.vue'

@Component({
  components: {
    Icon,
  },
})
export default class Breadcrumbs extends Vue {
  @Prop()
  private readonly items!: unknown[]
}
</script>

<style lang="scss" scoped>
.v-breadcrumbs {
  padding: 25px 0 30px;

  &__text {
    text-decoration: underline;
    color: #333;
  }
}
</style>
