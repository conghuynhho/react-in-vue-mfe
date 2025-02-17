import createFastContext, { IFastContextWrap } from '@gogo/share-mfe/fast-context'
import SubscribeRxjsStore, { extractStateFromRxjsStore } from '@gogo/share-mfe/fast-context/SubscribeRxjsStore'
import { createContext, ReactNode } from 'react'
import { BehaviorSubject } from 'rxjs'
import { StoreObject } from '../../components/Banner/Banner2'

type StoreState = {
  [K in keyof StoreObject]: StoreObject[K] extends BehaviorSubject<infer T> ? T : (StoreObject[K] | null)
};

export interface IStoreContextState extends StoreState {
  store: StoreObject
}

const defaultState: Partial<IStoreContextState> = {
  store: {} as StoreObject,
}

export const StoreContext = createContext<
  IFastContextWrap<IStoreContextState>
>({} as IFastContextWrap<IStoreContextState>)

export const StoreProvider = ({
  children,
  store,
}: {
  children: ReactNode
  store: StoreObject
}) => {

  const { useStore, FastContext } = createFastContext<IStoreContextState>(
    Object.assign({}, defaultState, {
      store,
      ...extractStateFromRxjsStore(store)
    }) as IStoreContextState
  )

  return (
    <StoreContext.Provider value={{ useStore }}>
      <FastContext>
        <SubscribeRxjsStore store={store} useStore={useStore}>
          {children}
        </SubscribeRxjsStore>
      </FastContext>
    </StoreContext.Provider>
  )
}


