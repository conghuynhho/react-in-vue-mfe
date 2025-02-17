import { css } from '@emotion/react'
import ThemeRegistry from '@gogo/share-mfe/theme'
import { Button, useTheme } from '@mui/material'
import { ReactNode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { useTranslation } from 'react-i18next'
import { BehaviorSubject } from 'rxjs'
import * as sources from '../../../lang/components/review-modal.json'
import { AppConfig, AppContext, AppProvider } from '../../fast-context/app'
import { StoreContext, StoreProvider } from '../../fast-context/store'
import I18nProvider from '../../provider/i18n'



export type StoreObject = {
  counter: BehaviorSubject<number>
  user: BehaviorSubject<string>
  incrementCounter: () => void
  setUser: (user: string) => void
}

const Banner2 = () => {
  const theme = useTheme()
  const { useStore } = useContext(AppContext)
  const { useStore: useStore2 } = useContext(StoreContext)
  const [store] = useStore2(state => state.store)
  const [counter] = useStore2(state => state.counter)
  const [user] = useStore2(state => state.user)
  const [httpContext] = useStore(state => state.http)
  const [appConfig] = useStore(state => state.appConfig)
  console.log('============= appConfig', appConfig)
  const { t } = useTranslation()

  const clickGetTermsUser = () => {
    const http = httpContext as any
    if(http){
      http.get('/api/v3/terms/user').then((data: any) => {
        console.log(data)
      })
    }
  }

  return (
    <div>
      <Button variant='contained' onClick={clickGetTermsUser} css={css`
        background-color: ${theme.palette.primary.main};
      `}>Get Terms User</Button>

      <div style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        backgroundImage: 'url(\'https://via.placeholder.com/800x300\')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          flexDirection: 'column',
        }}>
          <h2>Child react module {t('1')}</h2>
          <br/>
          Banner Text - Count: {counter}
          <br />
          User: {user}
        </div>
        <button
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => store.incrementCounter()}
        >
          Increment Count
        </button>
        <button
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => store.setUser('John Doe from module')}
        >
          Set User
        </button>
      </div>
    </div>
  )
}

export default function mountBanner2(props: {
  store: StoreObject,
  appConfig: AppConfig,
  VueHTTP: any
}, rootElement: HTMLElement) {
  if(rootElement){
    const root = createRoot(rootElement)
    root.render(
      <GlobalState {...props}>
        <Banner2 />
      </GlobalState>
    )
  }
}

const GlobalState = ({
  store,
  appConfig,
  VueHTTP,
  children
}: {
  store: StoreObject,
  appConfig: AppConfig,
  VueHTTP: any,
  children: ReactNode
}) => {

  return (
    <AppProvider http={VueHTTP} appConfig={appConfig}>
      <StoreProvider store={store}>
        <I18nProvider sources={sources} store={store}>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </I18nProvider>
      </StoreProvider>
    </AppProvider>
  )

}