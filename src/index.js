import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { isRegistered } from './components/reducers/userReducer';
import { user } from './components/reducers/userReducer';


export const POSTDARE = 'POSTDARE';
export const ACCEPTDARE = 'ACCEPTDARE';
export const DECLINEDARE = 'DECLINEDARE';

function handleDare(state = {}, action) {
  switch (action.type) {
    case POSTDARE:
      return action.current;
    case ACCEPTDARE:
      return { current: action.data };
    case DECLINEDARE:
      return {
        current: false,
        // suspended: new Date().getTime()
      };
    default:
      return state;
  }
}

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
