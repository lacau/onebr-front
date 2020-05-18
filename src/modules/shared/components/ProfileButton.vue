<template>
  <div>
    <v-menu
      left
      offset-y
      open-on-hover
      transition="slide-y-transition"
      nudge-bottom="10"
      close-delay="170"
    >
      <template #activator="{ on }">
        <primary-button v-on="on">
          {{ $t('shared.hello') }}, {{ firstName }}
          <icon right name="keyboard_arrow_down" />
        </primary-button>
      </template>
      <v-list width="200">
        <v-list-item @click="administrativeArea()">
          <v-list-item-title class="primary--text subtitle-2">
            {{ $t('shared.administrative_area') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="editProfile()">
          <v-list-item-title class="primary--text subtitle-2">
            {{ $t('shared.edit_profile') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="getOut()">
          <v-list-item-title class="primary--text subtitle-2">
            {{ $t('shared.get_out') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <profile-form v-model="userProfile" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import UserModel from '@/modules/shared/entities/form-models/User'

import Icon from '@/modules/shared/components/Icon.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import ProfileForm from '@/modules/shared/components/ProfileForm.vue'

const authModule = namespace('auth')
const sharedModule = namespace('shared')

@Component({
  components: {
    Icon,
    PrimaryButton,
    ProfileForm,
  },
})
export default class ProfileButton extends Vue {
  @authModule.Getter
  private readonly firstName!: string

  @authModule.Getter
  private readonly userId!: number

  @authModule.Action
  private readonly logout!: () => Promise<void>

  @sharedModule.Action
  private readonly fetchUserById!: (id: number) => Promise<UserModel>

  @sharedModule.Action
  private readonly fetchSpecies!: () => Promise<void>

  private userProfile: UserModel|null = null

  private administrativeArea() {
    this.$router.push({ name: 'admin.dashboard' })
  }

  private async editProfile() {
    const [, user] = await Promise.all([
      this.fetchSpecies(),
      this.fetchUserById(this.userId),
    ])

    this.userProfile = user
  }

  private async getOut() {
    await this.logout()

    this.$router.replace({ name: 'home' })
  }
}
</script>
