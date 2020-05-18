<template>
  <v-form
    lazy-validation
    ref="form"
    class="contact-form"
    @submit.prevent="submit()"
  >
    <h2 class="headline mb-9">
      {{ $t('contact.form.title') }}
    </h2>
    <v-text-field
      outlined
      required
      rounded
      name="name"
      v-model="model.name"
      :rules="[required]"
      :placeholder="$t('contact.form.field.name.placeholder')"
    />
    <v-text-field
      outlined
      required
      rounded
      name="email"
      type="email"
      v-model="model.email"
      :rules="[required, email]"
      :placeholder="$t('contact.form.field.email.placeholder')"
    />
    <v-text-field
      outlined
      rounded
      type="tel"
      name="telephone"
      v-model="model.telephone"
      v-mask="['(##) ####-####', '(##) #####-####']"
      :rules="[tel]"
      :placeholder="$t('contact.form.field.telephone.placeholder')"
    />
    <v-textarea
      auto-grow
      outlined
      required
      rounded
      name="message"
      v-model="model.message"
      :rules="[required]"
      :placeholder="$t('contact.form.field.message.placeholder')"
    />
    <primary-button
      invert
      block
      type="submit"
    >
      {{ $t('shared.actions.submit') }}
    </primary-button>
  </v-form>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { mask } from 'vue-the-mask'

import ValidatorMixin from '@/modules/shared/mixins/ValidatorMixin'
import MailService from '@/modules/shared/services/MailService'
import UserContact from '@/modules/shared/entities/UserContact'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

@Component({
  components: {
    PrimaryButton,
  },
  directives: {
    mask,
  },
})
export default class ContactForm extends Mixins(ValidatorMixin) {
  private model = new UserContact()

  private async submit() {
    if (!this.validate()) return

    try {
      await MailService.getInTouch(this.model)

      this.$toasted.success(this.$i18n.t('contact.mail_success') as string, { icon: 'check' })
      this.reset()
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
