import{createStore,applyMiddleware} from "redux";

import rootReducer from "./Reducers/index";

import {persistStore,persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";



const persistConfig ={
    key:'main-root',
    storage
}


const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = createStore(persistedReducer,applyMiddleware());

const Persistor = persistStore(store);

//const store = createStore(rootReducer);

export{Persistor};
export default store;