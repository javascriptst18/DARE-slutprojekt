import { POSTDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE } from './constants';

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
    const pendingDare = {
      id: action.id,
      current: action.current,
    };
      return pendingDare;
    case FAILEDTODARE:
      return action.error;
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
