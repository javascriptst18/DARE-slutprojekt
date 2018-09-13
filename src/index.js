import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import handleDare, { dareStatus, activityInfo } from './components/reducers/dareReducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { user, userSettings } from './components/reducers/userReducer';

//  store
const rootReducer = combineReducers({
  user, userSettings, handleDare, dareStatus, activityInfo,
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
