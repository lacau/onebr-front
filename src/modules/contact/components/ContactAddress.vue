<template>
  <section class="contact-address">
    <h2 class="body-1">
      {{ $t('contact.find_us') }}
    </h2>
    <address class="caption">
      <strong class="d-block">
        {{ $t('shared.footer.address.line.1') }}
      </strong>
      {{ $t('shared.footer.address.line.2') }} <br />
      {{ $t('shared.footer.address.line.3') }}
    </address>
    <v-img
      src="@/assets/contact_attendant.png"
      alt="Imagem atendente"
      width="100%"
      max-width="370"
      class="mx-auto"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ContactAddress extends Vue {}
</script>

<style lang="scss" scoped>
.contact-address {
  address {
    margin: 20px 0 98px;
  }
}
</style>
