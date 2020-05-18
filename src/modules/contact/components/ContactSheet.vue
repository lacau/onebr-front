<template>
  <div class="contact-sheet">
    <div class="contact-sheet__item">
      <slot name="left" />
    </div>
    <div class="contact-sheet__item">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ContactSheet extends Vue {}
</script>

<style lang="scss" scoped>
.contact-sheet {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin: 94px auto 0;
  max-width: 1120px;
  overflow: hidden;

  &__item {
    padding: 50px;
    width: 50%;

    &:last-child {
      background: #f8fbff;
    }
  }
}
</style>
