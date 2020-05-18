<template>
  <v-app>
    <app-bar />

    <v-content>
      <router-view />
    </v-content>

    <app-footer />

    <activity-indicator :show="loadingVisible" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import AppBar from '@/modules/shared/components/AppBar.vue'
import AppFooter from '@/modules/shared/components/AppFooter.vue'
import ActivityIndicator from '@/modules/behavior/components/ActivityIndicator.vue'

const behaviorModule = namespace('behavior')

@Component({
  components: {
    AppBar,
    AppFooter,
    ActivityIndicator,
  },
})
export default class App extends Vue {
  @behaviorModule.Getter
  private readonly loadingVisible!: boolean
}
</script>

<style lang="scss">
a {
  text-decoration: none;

  &:hover, &.router-link-active, &.is-active {
    color: #4141F5 !important;
  }
}

address {
  font-style: normal;
  line-height: 170% !important;
}

[class*="-page"] {
  background-position: center center;
  background-size: 100% 100%;
  padding-bottom: 112px;
  padding-top: 63px;
}

.bg-full {
  .v-image__image {
    background-size: 100% 100%;
  }
}

.v-application {
  .justify-space-evenly {
    justify-content: space-around; // fallback
    justify-content: space-evenly !important;
  }
}

.v-menu__content {
  border-radius: 30px !important;
  border: 1px solid #F0F0F0 !important;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2) !important;

  .v-list {
    padding: 0 !important;
  }
}

.v-dialog {
  &--top {
    align-self: flex-start;
    margin: 140px;
  }
}

.v-tooltip {
  &__content {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }
}

.v-data-table {
  &.--striped {
    th, td {
      border-bottom: none !important;
    }

    thead {
      background-color: #eee;
    }

    tbody tr {
      &:nth-child(even) {
        background-color: #f5f5f5;
      }
    }
  }

  &.--clickable {
    tbody tr {
      cursor: pointer;

      &.v-data-table__selected {
        background: rgba(158, 200, 255, 0.5) !important;
      }
    }
  }
}
</style>
