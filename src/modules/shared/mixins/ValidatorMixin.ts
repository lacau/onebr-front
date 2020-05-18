/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, Vue } from 'vue-property-decorator'

import {
  email, required, tel, minLength,
} from '@/modules/shared/utils/validators'

@Component
export default class ValidatorMixin extends Vue {
  $refs!: {
    form?: any;
  }

  private email(val: string) {
    return email(val) || this.$t('shared.validation.email')
  }

  private required(val: string) {
    const msg = this.$t('shared.validation.required')

    if (typeof val === 'string') {
      return required(val.trim()) || msg
    }

    return required(val) || msg
  }

  private tel(val: string) {
    return tel(val) || this.$t('shared.validation.tel')
  }

  private minLength(length: number, msg: string) {
    return (val: string) => minLength(length, val) || msg
  }

  validate(): boolean {
    return this.$refs.form?.validate()
  }

  reset() {
    this.$refs.form?.reset()
  }

  resetValidation(): void {
    this.$refs.form?.resetValidation()
  }
}
