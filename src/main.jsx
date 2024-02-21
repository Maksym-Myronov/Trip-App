import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Provider } from 'react-redux'
import store, {persistor } from './store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth0Provider  
          domain={domain} 
          clientId={clientId} 
          authorizationParams={{ redirect_uri: window.location.origin }}
        >
          <App />
        </Auth0Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
