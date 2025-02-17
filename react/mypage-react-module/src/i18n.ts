import i18n from 'i18next'
import { initReactI18next } from '../node_modules/react-i18next'


const initI18n = (sources: any, lang?: string) => {
  const NS_DEFAULT = 'translation'
  const LANG_DEFAULT = lang || 'ja'
  const LANG_FALLBACK = 'ja'

  const resources = Object.keys(sources).reduce((object, lang) => {
    return {
      ...object,
      [lang]: {
        // @ts-ignore
        [NS_DEFAULT]: sources[lang],
      },
    }
  }, {})

  i18n.use(initReactI18next).init({
    resources: resources,
    // Set default namespace,
    defaultNS: NS_DEFAULT,
    lng: LANG_DEFAULT,
    interpolation: {
      // react already safes from xss
      escapeValue: false,
    },
    fallbackLng: LANG_FALLBACK,
  })

  return i18n
}

export default initI18n
