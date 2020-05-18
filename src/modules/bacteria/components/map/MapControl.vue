<template>
  <div class="map-control">
    <v-tooltip left>
      <template #activator="{ on }">
        <v-btn
          class="mb-8"
          color="white"
          height="40"
          min-width="40"
          v-on="on"
          @click="$emit('update:fullscreen', !fullscreen)"
        >
          <fullscreen-exit-icon
            v-if="fullscreen"
          />
          <fullscreen-icon v-else />
        </v-btn>
      </template>
      <span v-show="!fullscreen">
        {{ $t('bacteria.enlarge_map') }}
      </span>
      <span v-show="fullscreen">
        {{ $t('bacteria.collapse_map') }}
      </span>
    </v-tooltip>

    <div class="map-control__zoom">
      <v-btn
        class="mb-3"
        color="white"
        height="40"
        min-width="40"
        @click="$emit('zoomIn')"
      >
        <add-icon />
      </v-btn>
      <v-btn
        color="white"
        height="40"
        min-width="40"
        @click="$emit('zoomOut')"
      >
        <remove-icon />
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import AddIcon from '@/modules/shared/components/icons/AddIcon.vue'
import RemoveIcon from '@/modules/shared/components/icons/RemoveIcon.vue'
import FullscreenIcon from '@/modules/shared/components/icons/FullscreenIcon.vue'
import FullscreenExitIcon from '@/modules/shared/components/icons/FullscreenExitIcon.vue'

@Component({
  components: {
    AddIcon,
    FullscreenExitIcon,
    FullscreenIcon,
    RemoveIcon,
  },
})
export default class MapControl extends Vue {
  @Prop({ required: true })
  private readonly fullscreen!: boolean
}
</script>

<style lang="scss" scoped>
.map-control {
  width: 40px;

  .v-btn {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }

  &, &__zoom {
    display: flex;
    flex-direction: column;
  }
}
</style>
