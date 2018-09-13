import {
  POSTDARE, MATCHEDDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE, QUEUE, NODARE, USERMATCH, MATCHEDPENDING, MATCHEDACCEPTED, STATUSFAILED,
} from '../constants';

export default function handleDare(state = {}, action) {
  switch (action.type) {
    case POSTDARE:
      return action.type;
    case FAILEDTODARE:
      return action.error;
    case MATCHEDDARE:
      return action;
    case ACCEPTDARE:
      return { current: action.data };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}

export function dareStatus(state = {}, action) {
  switch (action.type) {
    case NODARE:
      return {};
    case QUEUE:
      return action;
    case USERMATCH:
      return action;
    case MATCHEDPENDING:
      return action;
    case MATCHEDACCEPTED:
      return action;
    case STATUSFAILED:
      return action;
    case 'LOGOUT':
      return {};
    default: return state;
  }
}

export function activityInfo(state = {}, action) {
  switch (action.type) {
    case 'SET_ACTIVTY':
      return action.send;
    case 'LOGOUT':
      return {};
    default: return state;
  }
}
