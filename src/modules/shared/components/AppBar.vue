<template>
  <v-app-bar
    app
    class="app-bar white"
    elevation="1"
    height="100"
  >
    <template v-if="restrictedArea">
      <strong class="primary--text font-weight-bold ml-n1">
        <icon
          outlined
          name="settings"
          color="primary"
          left
        />
        {{ $t('shared.administrative_area') }}
      </strong>

      <v-spacer />

      <v-btn text exact class="mr-4" :to="{ name: 'home' }">
        <home-icon class="mr-3"/>
        {{ $t('shared.view_site') }}
      </v-btn>
    </template>

    <template v-else>
      <menu-dialog v-model="menu">
        <template v-slot="{ on }">
          <v-app-bar-nav-icon
            large
            color="primary"
            v-on="on"
          />
        </template>
      </menu-dialog>

      <v-spacer />

      <router-link class="app-bar__logo" to="/">
        <img src="@/assets/logo.svg" />
      </router-link>

      <primary-button
        v-if="!isAuthenticated"
        :to="{ name: 'login' }"
        class="mr-5"
      >
        {{ $t('shared.login') }}
      </primary-button>
    </template>

    <profile-button
      class="mr-5"
      v-if="isAuthenticated"
    />

    <locale-changer />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import HomeIcon from '@/modules/shared/components/icons/HomeIcon.vue'
import Icon from '@/modules/shared/components/Icon.vue'
import LocaleChanger from '@/modules/shared/components/LocaleChanger.vue'
import MenuDialog from '@/modules/shared/components/menu/MenuDialog.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import ProfileButton from '@/modules/shared/components/ProfileButton.vue'

const authModule = namespace('auth')

@Component({
  components: {
    HomeIcon,
    Icon,
    LocaleChanger,
    MenuDialog,
    PrimaryButton,
    ProfileButton,
  },
})
export default class AppBar extends Vue {
  private menu = false;

  @authModule.Getter
  private readonly isAuthenticated!: boolean

  private get restrictedArea() {
    return this.$route.matched.some((record) => record.meta.auth)
  }
}
</script>

<style lang="scss" scoped>
  .app-bar {
    padding: 0 40px;

    &__logo {
      left: 50%;
      height: 62px;
      position: absolute;
      transform: translateX(-50%);

      img {
        height: 100%;
      }
    }
  }
</style>
