<template>
  <prompt-dialog
    v-model="promptDialog"
    :message="$t('auth.forgot_password_prompt_message')"
    @confirm="sendRecoverPassword"
  >
    <template #activator="{ on }">
      <a class="caption font-weight-bold" v-on.prevent="on">
        {{ $t('auth.forgot_password') }}
      </a>
    </template>
  </prompt-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import PromptDialog from '@/modules/shared/components/PromptDialog.vue'

const authModule = namespace('auth')

@Component({
  components: {
    PromptDialog,
  },
})
export default class RecoverPassword extends Vue {
  @authModule.Action
  private readonly recoverPassword!: (username: string) => Promise<void>

  private promptDialog = false

  private sendRecoverPassword(username: string) {
    this.promptDialog = false
    this.recoverPassword(username)
  }
}
</script>
