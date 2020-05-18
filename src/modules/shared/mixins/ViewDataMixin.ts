import { Component, Watch, Vue } from 'vue-property-decorator'
import { set } from 'lodash'

import axios from '@/main/axios'

import ViewDataService from '@/modules/shared/services/ViewDataService'
import ViewData, { ViewDataScope } from '@/modules/shared/entities/ViewData'

@Component
class ViewDataMixin extends Vue {
  viewDataLoading = false

  loadedLanguages = new Set()

  viewDataScope?: ViewDataScope

  setLanguage(lang: string) {
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html')?.setAttribute('lang', lang)
  }

  setI18nLanguage(lang: string, viewData: ViewData) {
    const messages = this.$i18n.messages[lang]

    viewData.items.forEach(({ key, value }) => {
      set(messages, key, value)
    })

    this.$i18n.setLocaleMessage(lang, messages)
  }

  async loadLanguage() {
    const { locale } = this.$i18n

    if (!this.viewDataScope) {
      throw new Error('ViewData mixin: viewDataScope property must be assined by subclass')
    }

    this.setLanguage(locale)

    if (this.loadedLanguages.has(locale)) {
      return
    }

    try {
      this.viewDataLoading = true

      const { data } = await ViewDataService.getViewData(this.viewDataScope)

      this.setI18nLanguage(locale, data)
      this.loadedLanguages.add(locale)
    } catch (err) {
      console.error(err)
    } finally {
      this.viewDataLoading = false
    }
  }

  @Watch('$i18n.locale')
  localeChange() {
    this.loadLanguage()
  }

  mounted() {
    this.loadLanguage()
  }
}

export default ViewDataMixin
