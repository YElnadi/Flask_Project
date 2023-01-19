import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import Player from './components/ContinuousPlayer';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
        <Player />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
