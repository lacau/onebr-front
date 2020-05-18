<template>
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
        {{ $i18n.locale }}
        <icon right name="keyboard_arrow_down" />
      </primary-button>
    </template>
    <v-list>
      <v-list-item
        :key="`Lang${i}`"
        v-for="(lang, i) in langs"
        @click="$i18n.locale = lang"
      >
        <v-list-item-title class="primary--text subtitle-2">
          {{ $t(`shared.locales.${lang}`) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Icon from '@/modules/shared/components/Icon.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

@Component({
  components: {
    Icon,
    PrimaryButton,
  },
})
export default class LocaleChanger extends Vue {
  langs = ['pt-BR', 'en']
}
</script>
