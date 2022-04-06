import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './state/store'

const domain = 'dev-4ts2gaz2.us.auth0.com'
const clientId = '26itf3iAVNMpXB9m93xBkJaECTmj0eDW'

ReactDOM.render(
  <Auth0Provider 
    domain={domain} 
    clientId={clientId}
    redirectUri={window.location.origin}>
    <Provider store={store}>
        <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
