<template>
  <v-sheet id="navigation" elevation="4" tag="nav">
    <v-btn
      large icon
      class="ml-11"
      color="primary"
      @click="close()"
    >
      <icon large name="close" />
    </v-btn>

    <v-container fill-height>
      <v-row>
        <v-col v-for="(item, index) in menuItems" :key="index">
          <menu-item
            :title="item.title"
            :subtitle="item.subtitle"
            :to="item.to"
            @click.native="close()"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Icon from '../Icon.vue'
import MenuItem from './MenuItem.vue'

@Component({
  components: {
    Icon,
    MenuItem,
  },
})
export default class Menu extends Vue {
  private get menuItems() {
    return [
      {
        title: this.$t('shared.menu.1.title'),
        subtitle: this.$t('shared.menu.1.text'),
        to: { name: 'team' },
      },
      {
        title: this.$t('shared.menu.2.title'),
        subtitle: this.$t('shared.menu.2.text'),
        to: { name: 'contributors' },
      },
      {
        title: this.$t('shared.menu.3.title'),
        subtitle: this.$t('shared.menu.3.text'),
        to: { name: 'publications' },
      },
      {
        title: this.$t('shared.menu.4.title'),
        subtitle: this.$t('shared.menu.4.text'),
        to: { name: 'contact' },
      },
    ]
  }

  private close() {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
#navigation {
  padding: 32px 0 60px;
}
</style>
