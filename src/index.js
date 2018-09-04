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
/**
function newDare(state={}, action) {
    switch(action.type) {
        case 
    }
} */
//store
const rootReducer = combineReducers({ user, });

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk), 
  );
  

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
