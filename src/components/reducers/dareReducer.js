import {
  POSTDARE, MATCHEDDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE, QUEUE, NOACTIVITY, MATCHEDPENDING, MATCHEDACCEPTED, STATUSFAILED 
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
    case DECLINEDARE:
      return {
        current: false,
        // suspended until: new Date().getTime() + 7 days
      };
    default:
      return state;
  }
}

export function dareStatus(state = {}, action) {
  switch (action.type) {
    case NOACTIVITY:
      return {};
    case QUEUE:
    return action;
    case MATCHEDPENDING:
      return action;
    case MATCHEDACCEPTED:
      return action;
    case STATUSFAILED:
      return action;
    default: return state;
  }
}
