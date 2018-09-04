import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

//reducer(s)
function user(state='', action) {
    switch(action.type){
        case LOGIN: 
            return action.email;
        case LOGOUT:
            return '';
        default:
            return state; 
    }
}

export const POSTDARE = 'POSTDARE';
export const ACCEPTDARE ='ACCEPTDARE';
export const DECLINEDARE = 'DECLINEDARE';

function handleDare(state={}, action) {
    switch(action.type) {
        case POSTDARE:
            return action.current;
        case ACCEPTDARE:
            return {current: action.data};
        case DECLINEDARE: 
            return {current: false,
               // suspended until: new Date().getTime() + 7 days
            };
        default: 
            return state;
    }
} 

//store
const rootReducer = combineReducers({ user, handleDare });

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk), 
  );
  

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
