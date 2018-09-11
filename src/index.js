import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import handleDare, { dareStatus } from './components/reducers/dareReducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { user, userSettings } from './components/reducers/userReducer';

//  store
const rootReducer = combineReducers({
  user, userSettings, handleDare, dareStatus,
});

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
