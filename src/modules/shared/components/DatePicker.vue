<template>
  <v-menu
    offset-y
    min-width="290px"
    transition="slide-y-transition"
    nudge-bottom="10"
    v-model="menu"
    :left="left"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        hide-details
        outlined
        readonly
        rounded
        v-on="on"
        :label="label"
        :clearable="clearable"
        :value="formattedValue"
        :placeholder="placeholder"
        @input="inputHandler"
      >
        <template #append>
          <date-range-icon />
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      no-title
      :min="min"
      :max="max"
      :value="value"
      @input="inputHandler"
    />
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import DateRangeIcon from '@/modules/shared/components/icons/DateRangeIcon.vue'

@Component({
  components: {
    DateRangeIcon,
  },
})
export default class DatePicker extends Vue {
  @Prop({ default: '' })
  private readonly placeholder!: string

  @Prop({ default: undefined })
  private readonly value!: string|string[]|undefined

  @Prop({ default: false })
  private readonly left!: boolean

  @Prop({ default: undefined })
  private readonly min!: string|undefined

  @Prop({ default: undefined })
  private readonly max!: string|undefined

  @Prop({ default: false, type: Boolean })
  private readonly clearable!: boolean

  @Prop({ default: '' })
  private readonly label!: string

  private menu = false

  private get formattedValue(): string|string[]|undefined {
    if (!this.value) {
      return this.value
    }

    if (Array.isArray(this.value)) {
      return this.value.map(this.formatDate)
    }

    return this.formatDate(this.value)
  }

  private formatDate(ISODate: string): string {
    const [year, month, day] = ISODate.slice(0, 10).split('-').map(Number)
    const date = new Date(year, (month - 1), day)

    return this.$i18n.d(date)
  }

  private inputHandler(date: string) {
    this.$emit('input', date)
    this.menu = false
  }
}
</script>
