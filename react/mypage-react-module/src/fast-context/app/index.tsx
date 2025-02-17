import { createContext, ReactNode } from 'react'
import createFastContext, { IFastContextWrap } from '@gogo/share-mfe/fast-context'

export type AppConfig = {
  [key: string]: string | number
}

export type Auth = {
  [key: string]: string | number
}
export interface IAppContextState {
  http: any
  appConfig: AppConfig
  auth: Auth
}

const defaultState: IAppContextState = {
  http: null,
  appConfig: {},
  auth: {},
}

export const AppContext = createContext<
  IFastContextWrap<IAppContextState>
>({} as IFastContextWrap<IAppContextState>)

export const AppProvider = ({
  children,
  http,
  appConfig,
}: {
  children: ReactNode
  http: any
  appConfig: AppConfig
}) => {

  const { useStore, FastContext } = createFastContext<IAppContextState>(
    Object.assign({}, defaultState, { http: http, appConfig: appConfig }),
  )

  return (
    <AppContext.Provider value={{ useStore }}>
      <FastContext>{children}</FastContext>
    </AppContext.Provider>
  )
}
