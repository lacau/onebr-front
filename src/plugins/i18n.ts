import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'
import { set, without } from 'lodash'

Vue.use(VueI18n)

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context(
    '../modules',
    true,
    /locales\/[A-Za-z0-9-_,\s]+\.json$/i,
  )

  return locales.keys()
    .reduce((acc: LocaleMessages, key) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)

      if (matched && matched.length > 1) {
        const locale = matched[1]
        const paths = key.split('/').slice(0, -1)
        const omit = ['.', 'locales']
        const namespace = without(paths, ...omit).join('.')

        set(acc, `${locale}.${namespace}`, locales(key))
      }

      return acc
    }, {})
}

const messages = loadLocaleMessages()

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages,
  dateTimeFormats: {
    'pt-BR': {
      short: {
        year: 'numeric', month: 'long',
      },
    },
    en: {
      short: {
        year: 'numeric', month: 'short',
      },
    },
  },
})

if (process.env.NODE_ENV !== 'production') {
  console.log('[LOCALES LOADED]', messages)
}
