import React, { useState } from "react";
import  ReactDOM from "react-dom";
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";

import store,{Persistor} from "./store";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'

import './App.css'

import App from "./App"



store.subscribe(()=>console.log(store.getState()));

ReactDOM.render(

     

      <Provider store={store}>
      <BrowserRouter>
      <PersistGate loading={null} persistor={Persistor}>
            <App/>
      </PersistGate>
      </BrowserRouter>
      </Provider>,
  document.getElementById("root")
);