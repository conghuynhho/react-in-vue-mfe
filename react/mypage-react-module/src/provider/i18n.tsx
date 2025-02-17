import { useState, useMemo, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import initI18n from '../i18n'

export default function I18nProvider({ children, sources, store }: { children: React.ReactNode, sources: any, store: any }) {

  const [lang, setLang] = useState('ja')
  const i18n = useMemo(() => {
    return initI18n(sources, lang)
  }, [lang])

  useEffect(() => {
    if (store) {
      const langSub = store.lang.subscribe((value: any) => {
        setLang(value)
      })

      return () => {
        langSub.unsubscribe()
      }
    }
  }, [store])


  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
