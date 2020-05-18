<template>
  <router-link :to="to" class="image-button">
    <div class="image-button__image">
      <slot name="image" />
    </div>
    <p class="body-1 primary--text font-weight-bold ma-0">
      <slot />
    </p>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component
export default class ImageButton extends Vue {
  @Prop()
  private readonly to!: Route
}
</script>

<style lang="scss" scoped>
.image-button {
  align-items: center;
  background: #ffffff;
  border-radius: 30px;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 30px;
  text-align: center;
  width: 200px;

  &__image {
    flex-shrink: 0;
    height: 90px;
    margin-bottom: 20px;
    width: 90px;
  }
}
</style>
