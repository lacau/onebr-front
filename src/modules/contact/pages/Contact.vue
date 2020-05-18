<template>
  <div class="contact-page">
    <v-container>
      <headline
        class="text-center"
        :title="$t('contact.headline.title')"
        :subtitle="$t('contact.headline.subtitle')"
      />

      <contact-sheet>
        <template #left>
          <contact-form />
        </template>
        <template #right>
          <contact-address />
        </template>
      </contact-sheet>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import ContactSheet from '../components/ContactSheet.vue'
import ContactForm from '../components/ContactForm.vue'
import ContactAddress from '../components/ContactAddress.vue'

@Component({
  components: {
    Headline,
    ContactSheet,
    ContactForm,
    ContactAddress,
  },
})
export default class Contact extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.contact
}
</script>

<style lang="scss" scoped>
.contact-page {
  background-image: url(../../../assets/contact_bg.png);
}
</style>
