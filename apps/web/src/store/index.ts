import { type Store, createStore } from 'easy-peasy';
import {  AuthModel, AuthModelConfiguration, configureAuthModel } from './models';


export interface GlobalStore { 

  
  auth: AuthModel;
  

}

interface StoreConfiguration {

  authConfig:AuthModelConfiguration

}

export function configureStore(config:StoreConfiguration): Store<GlobalStore> { 

   const store:Store<GlobalStore> = createStore<GlobalStore>({
     auth: configureAuthModel(config.authConfig),
     
   })
  return store;

}