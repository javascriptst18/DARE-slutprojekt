import db from '../../firebase';
import {
  POSTDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE, MATCHEDDARE, PENDINGDARE, QUEUE, NOACTIVITY, MATCHEDPENDING, MATCHEDACCEPTED, STATUSFAILED
} from '../constants';

export function postDare(dare, email) {
  return function (dispatch, getState) {
    return db.collection('queue').doc(email).set(dare)
      .then(
        matched => dispatch({ matched, current: true, userMatch:true, type: POSTDARE }),
        error => dispatch({ error, type: FAILEDTODARE }),
      );
  }
}

export function postUserMatch(match) {
  return function (dispatch, getState) {
    return db.collection('userMatch').add(match)
      .then(
        userMatch => dispatch({
          id: userMatch.id,
          collection:'userMatch',
          current: true,
          type: MATCHEDDARE,
        }),
        error => dispatch({ error, type: FAILEDTODARE }),
      );
  }
}

export function postPendingDare(match) {
  return function (dispatch, getState) {
    return db.collection('matchedDare').add(match)
      .then(
        pending => dispatch({ id: pending.id, collection:'matchedDare', current: true, type: PENDINGDARE }),
        error => dispatch({ error, type: FAILEDTODARE }),
      );
  }
}

export function acceptDare(dare) {
  return { type: ACCEPTDARE };
}

export function declineDare(dare) {
  return { type: DECLINEDARE };
}

export function inQueue() {
  return { type: QUEUE }
}

export function noActivity() {
  return { type: NOACTIVITY }
}