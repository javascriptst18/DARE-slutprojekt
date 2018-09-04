import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// react, redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

export function user(state = '', action) {
  switch (action.type) {
    case 'LOGIN':
      state = action.value;
      return state;
    case 'LOGOUT':
      return '';
    default:
      return state;
  }
}
// store
const rootReducer = combineReducers({ user });

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
