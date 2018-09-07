import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { user, handleDare } from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { isRegistered } from './components/reducers/userReducer';
import { user } from './components/reducers/userReducer';

//  store
const rootReducer = combineReducers({ user, handleDare, isRegistered });

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
