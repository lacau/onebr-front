<template>
  <article class="publication-item">
    <div>
      <p v-if="publication.date" class="body-2 grey--text text--darken-1 mb-2">
        {{ $d(publication.date, 'short') }}
      </p>

      <h1 class="body-1 font-weight-medium mb-4">
        {{ publication.title }}
      </h1>

      <p class="body-2 mb-0">
        {{ publication.description }}
      </p>
    </div>

    <primary-button
      class="ml-8"
      target="_blank"
      :href="publication.link"
    >
      {{ $t(`publication.type.${publication.type}`) }}
    </primary-button>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Publication from '@/modules/shared/entities/Publication'

import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

@Component({
  components: {
    PrimaryButton,
  },
})
export default class PublicationItem extends Vue {
  @Prop({ required: true })
  private readonly publication!: Publication
}
</script>

<style lang="scss" scoped>
.publication-item {
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 30px;
}
</style>
