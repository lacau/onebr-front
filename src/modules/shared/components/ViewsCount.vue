<template>
  <div class="views-count primary" :class="{expanded: expanded}">
    <div class="views-count__inner">
      <v-btn icon large @click="toggleExpand(!expanded)">
        <global-icon />
      </v-btn>

      <span class="subtitle-2 text-no-wrap mr-2">
        <span ref="views">0</span> {{ $t('shared.views') }}
      </span>

      <v-btn icon large @click="toggleExpand(false)">
        <icon name="close" color="white" />
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import GlobalIcon from '@/modules/shared/components/icons/GlobalIcon.vue'
import Icon from '@/modules/shared/components/Icon.vue'

@Component({
  components: {
    GlobalIcon,
    Icon,
  },
})
export default class ViewsCount extends Vue {
  $refs!: {
    views: HTMLSpanElement;
  }

  private expanded = false

  private toggleExpand(expanded: boolean) {
    this.expanded = expanded
  }

  private mounted() {
    // TODO: remove this code when implement page view count on backend
    const hitCounter = document.querySelector('.hitCounter') as HTMLAnchorElement|null

    if (!hitCounter) return

    const timerId = setInterval(() => {
      if (!Number.isNaN(Number(hitCounter.innerText))) {
        this.$refs.views.innerText = hitCounter.innerText
        clearInterval(timerId)
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.views-count {
  border-radius: 30px;
  bottom: 230px;
  color: white;
  opacity: .5;
  overflow: hidden;
  position: fixed;
  right: 50px;
  width: 50px;
  z-index: 1;

  &__inner {
    align-items: center;
    display: flex;
  }

  &.expanded {
    width: auto;
    opacity: 1;
  }
}
</style>
