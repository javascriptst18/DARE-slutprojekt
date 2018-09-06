import {
  POSTDARE, MATCHEDDARE, PENDINGDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE 
} from './constants';

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

export function handleDare(state = {}, action) {
  switch (action.type) {
    case POSTDARE:
      return action;
    case FAILEDTODARE:
      return action.error;
    case MATCHEDDARE:
      return action;
    case PENDINGDARE:
      return action;
    case ACCEPTDARE:
      return { current: action.data };
    case DECLINEDARE:
      return {
        current: false,
        // suspended until: new Date().getTime() + 7 days
      };
    default:
      return state;
  }
}
