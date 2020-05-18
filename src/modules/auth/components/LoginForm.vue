<template>
  <v-form
    lazy-validation
    ref="form"
    class="login-form"
    @submit.prevent="submit()"
  >
    <v-text-field
      outlined
      rounded
      required
      name="userName"
      type="email"
      v-model="form.username"
      :rules="[required]"
      :placeholder="$t('auth.form.labels.login')"
    />
    <v-text-field
      outlined
      rounded
      required
      name="password"
      type="password"
      v-model="form.password"
      :rules="[required]"
      :placeholder="$t('auth.form.labels.password')"
    />
    <primary-button
      invert
      block
      type="submit"
      class="mt-2"
    >
      {{ $t('auth.form.actions.submit') }}
    </primary-button>
  </v-form>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import BasicCredentials from '@/modules/shared/entities/BasicCredentials'

import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import ValidatorMixin from '@/modules/shared/mixins/ValidatorMixin'

const authModule = namespace('auth')

@Component({
  components: {
    PrimaryButton,
  },
})
export default class LoginForm extends Mixins(ValidatorMixin) {
  @authModule.Action
  private readonly login!: (credentials: BasicCredentials) => Promise<void>

  private form = new BasicCredentials()

  async submit(): Promise<void> {
    const { redirect = '/admin' } = this.$route.query

    if (!this.validate()) return

    try {
      await this.login(this.form)

      this.$router.replace({
        path: redirect as string,
      })
    } catch (err) {
      // TODO: handle this error
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  margin: 92px 0 36px;
  max-width: 460px;
  width: 100%;
}
</style>
