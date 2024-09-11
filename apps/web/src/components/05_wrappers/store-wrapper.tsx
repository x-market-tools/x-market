"use client"
import { configureStore } from '@/store';
import { StoreProvider } from 'easy-peasy';
import { ReactNode } from 'react';
type StoreWrapperProps = {children:ReactNode[] | ReactNode}
export const StoreWrapper: React.FunctionComponent<StoreWrapperProps> = ({ children}) => { 

  const store = configureStore({authConfig: {
    appName: process.env.NEXT_PUBLIC_PROTON_APP_NAME!,
    protonEndpoints:
      process.env.NEXT_PUBLIC_CHAIN_ENDPOINTS!.split(","),
    requestedAccount: process.env.NEXT_PUBLIC_PROTON_REQUEST_ACCOUNT!,
  },})
   return <><StoreProvider store={store}>{children}</StoreProvider></>
}