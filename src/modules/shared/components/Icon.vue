<template>
  <v-icon
    :class="{'material-icons-outlined': outlined }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    {{ name }}
  </v-icon>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Icon extends Vue {
  @Prop({ required: true })
  private readonly name!: string;

  @Prop({ default: false, type: Boolean })
  private readonly outlined!: boolean;
}
</script>
