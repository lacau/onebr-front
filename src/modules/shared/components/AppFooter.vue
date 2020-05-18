<template>
  <v-footer v-if="!restrictedArea" class="pa-0 white" height="268">
    <v-img class="bg-full" src="@/assets/footer_bg.png" height="100%">
      <v-container fluid align-end fill-height pb-12 px-12>
        <v-row no-gutters>
          <v-col>
            <h2 class="title primary--text font-weight-bold mb-2">
              {{ $t('shared.footer.by') }}
            </h2>
            <v-img
              src="@/assets/lincopan.png"
              width="362"
              alt="Lincopan lab"
            />
          </v-col>
          <v-col class="text-right">
            <nav class="body-1 font-weight-bold">
              <router-link
                class="ml-7"
                v-for="(item, index) in menuItems"
                :key="index"
                :to="item.to"
              >
                {{ item.title }}
              </router-link>
            </nav>
            <address class="body-2 pt-5">
              <strong class="d-block">
                {{ $t('shared.footer.address.line.1') }}
              </strong>
              {{ $t('shared.footer.address.line.2') }} <br />
              {{ $t('shared.footer.address.line.3') }}
            </address>
            <small class="caption grey--text text--darken-1">
              <span v-html="$t('shared.copyright')"></span>
              <a
                class="grey--text text--darken-1"
                href="https://www.geratek.com.br/home/"
                style="text-decoration: underline;"
                target="_blank"
              >
                geraTek
              </a>
            </small>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-footer>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

@Component
export default class AppFooter extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.footer

  private get restrictedArea() {
    return this.$route.matched.some((record) => record.meta.auth)
  }

  private get menuItems() {
    return [
      {
        title: this.$t('shared.menu.1.title'),
        to: { name: 'team' },
      },
      {
        title: this.$t('shared.menu.2.title'),
        to: { name: 'contributors' },
      },
      {
        title: this.$t('shared.menu.3.title'),
        to: { name: 'publications' },
      },
      {
        title: this.$t('shared.menu.4.title'),
        to: { name: 'contact' },
      },
    ]
  }
}
</script>
