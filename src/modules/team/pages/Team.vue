<template>
  <div class="team-page">
    <v-container>
      <headline
        class="text-center pb-2"
        :title="$t('team.headline.title')"
        :subtitle="$t('team.headline.subtitle')"
      />

      <v-img
        src="@/assets/team_mascot.png"
        max-width="708"
        max-height="357"
        class="mascot"
      />

      <v-row class="mb-10" justify="center">
        <team-section :members="instructor" :title="$t('team.instructor')">
          <template v-slot="member">
            <team-member :member="member" />
          </template>
        </team-section>

        <team-section :members="postDocStudents" :title="$t('team.post_doc_student')">
          <template v-slot="member">
            <team-member :member="member" />
          </template>
        </team-section>
      </v-row>

      <v-row class="mb-10" justify="center">
        <team-section :members="docStudents" :title="$t('team.phd_students')">
          <template v-slot="member">
            <team-member :member="member" />
          </template>
        </team-section>
      </v-row>

      <v-row justify="center">
        <team-section :members="mastering" :title="$t('team.mastering')">
          <template v-slot="member">
            <team-member :member="member" />
          </template>
        </team-section>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import TeamMemberEntity from '@/modules/shared/entities/TeamMember'
import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import TeamMember from '../components/TeamMember.vue'
import TeamSection from '../components/TeamSection.vue'

const TeamModule = namespace('team')

@Component({
  components: {
    Headline,
    TeamMember,
    TeamSection,
  },
})
export default class Team extends Mixins(ViewDataMixin) {
  @TeamModule.Action
  private readonly fetchTeam!: () => Promise<void>;

  @TeamModule.Getter
  private readonly instructor!: TeamMemberEntity[];

  @TeamModule.Getter
  private readonly postDocStudents!: TeamMemberEntity[];

  @TeamModule.Getter
  private readonly docStudents!: TeamMemberEntity[];

  @TeamModule.Getter
  private readonly mastering!: TeamMemberEntity[];

  viewDataScope = ViewDataScope.team

  mounted() {
    this.fetchTeam()
  }
}
</script>

<style lang="scss" scoped>
.team-page {
  background-image: url(../../../assets/team_bg.png);

  .mascot {
    margin: 48px auto 90px;
  }
}
</style>
