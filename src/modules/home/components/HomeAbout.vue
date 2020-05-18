<template>
  <v-img
    id="section-about"
    class="bg-full"
    src="@/assets/home_about_bg.png"
    height="695"
  >
    <v-container fill-height>
      <v-row>
        <v-col class="text-center" cols="12" md="6" lg="5">
          <img
            src="@/assets/home_about_person.png"
            width="441"
            height="419"
          />
        </v-col>
        <v-col class="pr-12" cols="12" md="6" lg="7">
          <h2 class="display-2 primary--text mb-6">
            {{ $t('home.about.title') }}
          </h2>
          <p class="body-2" v-html="$t('home.about.text')" />
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeAbout extends Vue {}
</script>

<style lang="scss" scoped>
p {
  line-height: 185% !important;
}
</style>
