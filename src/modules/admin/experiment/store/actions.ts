import Vue from 'vue'
import { ActionContext } from 'vuex'

import i18n from '@/plugins/i18n'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import ExperimentModel from '@/modules/shared/entities/form-models/Experiment'

import BacteriaService from '@/modules/shared/services/BacteriaService'
import BacteriaFilterService from '@/modules/shared/services/BacteriaFilterService'
import RegionService from '@/modules/shared/services/RegionService'

import { ExperimentState } from './state'

export default {
  async fetchExperiments({ commit }: ActionContext<ExperimentState, unknown>, filter: BacteriaFilter): Promise<void> {
    commit('setFilter', filter)

    try {
      const { data } = await BacteriaService.getExperimentsAdminPaginated(filter)
      commit('setExperiments', data.content)
      commit('setPageable', data.pageable)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchBacteriaFilters({ commit }: ActionContext<ExperimentState, unknown>): Promise<void> {
    try {
      const { data: st } = await BacteriaFilterService.getSts()
      const [
        species, plasmidome, antigenH, antigenO,
        virulome, heavyMetal, serovar, clermontTyping,
        source, origin, sequencer, countries, regions, cities,
      ] = await Promise.all([
        BacteriaFilterService.getSpecies(),
        BacteriaFilterService.getPlasmidome(),
        BacteriaFilterService.getAntigenH(),
        BacteriaFilterService.getAntigenO(),
        BacteriaFilterService.getVirulome(),
        BacteriaFilterService.getHeavyMetal(),
        BacteriaFilterService.getSerovar(),
        BacteriaFilterService.getClermontTyping(),
        BacteriaFilterService.getSources(),
        BacteriaFilterService.getOrigin(),
        BacteriaFilterService.getSequencer(),
        RegionService.getCountries(),
        RegionService.getRegions(),
        RegionService.getCities(1, ''),
      ])

      commit('setSpecies', species.data)
      commit('setPlasmidome', plasmidome.data)
      commit('setAntigenH', antigenH.data)
      commit('setAntigenO', antigenO.data)
      commit('setVirulome', virulome.data)
      commit('setHeavyMetal', heavyMetal.data)
      commit('setSerovar', serovar.data)
      commit('setClermontTyping', clermontTyping.data)
      commit('setSt', st)
      commit('setSources', source.data)
      commit('setOrigin', origin.data)
      commit('setSequencer', sequencer.data)
      commit('setCountries', countries.data)
      commit('setRegions', regions.data)
      commit('setCities', cities.data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchLocalizedBacteriaFilters({ commit }: ActionContext<ExperimentState, unknown>): Promise<void> {
    try {
      const [source, origin, countries, regions] = await Promise.all([
        BacteriaFilterService.getSources(),
        BacteriaFilterService.getOrigin(),
        RegionService.getCountries(),
        RegionService.getRegions(),
      ])

      commit('setSources', source.data)
      commit('setOrigin', origin.data)
      commit('setCountries', countries.data)
      commit('setRegions', regions.data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchExperimentById({ commit }: ActionContext<ExperimentState, unknown>, id: number): Promise<void> {
    try {
      const { data } = await BacteriaService.getExperimentAdminById(id)
      commit('setFormModel', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async removeExperiment({ commit, dispatch, state }: ActionContext<ExperimentState, unknown>, id: number): Promise<void> {
    try {
      await BacteriaService.deleteExperiment(id)

      Vue.toasted.success(i18n.t('admin.experiment.messages.deleted') as string, { icon: 'check' })

      commit('setFormModel', null)
      dispatch('fetchExperiments', state.filter)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async saveExperiment({ commit, dispatch, state }: ActionContext<ExperimentState, unknown>, formModel: ExperimentModel): Promise<void> {
    const { createExperiment, updateExperiment } = BacteriaService
    const action = formModel.id ? updateExperiment : createExperiment
    const message = formModel.id ? 'updated' : 'added'

    try {
      await action(formModel)

      Vue.toasted.success(i18n.t(`admin.publication.messages.${message}`) as string, { icon: 'check' })

      commit('setFormModel', null)
      dispatch('fetchExperiments', state.filter)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
