import db from '../../firebase';
import {
  POSTDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE, MATCHEDDARE, QUEUE, NOACTIVITY, MATCHEDPENDING, MATCHEDACCEPTED, STATUSFAILED
} from '../constants';

export function postDare(dare, email) {
  return function (dispatch, getState) {
    return db.collection('queue').doc(email).set(dare)
      .then(
        posted => dispatch({ posted, type: POSTDARE }),
        error => dispatch({ error, type: FAILEDTODARE }),
      );
  };
}

export function postUserMatch(match) {
  return function (dispatch, getState) {
    return db.collection('userMatch').add(match)
      .then(
        userMatch => dispatch({
          userMatchId: userMatch.id,
          collection:'userMatch',
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
        pending => dispatch({ id: pending.id, collection:'matchedDare', type: MATCHEDPENDING }),
        error => dispatch({ error, type: FAILEDTODARE }),
      );
  }
}

export function inQueue(dare) {
  return { type: QUEUE, dare }
}

export function userMatched(data) {
  return function (dispatch, getState) {
    return db.collection('matchedDare').where('userMatchId', '==', data.id).get()
    .then((result) => {
      if (result.exists) dispatch({userMatch: data, activityMatchId: result.id, type: MATCHEDPENDING})
      else dispatch({ type: MATCHEDDARE, userMatch: data })
    }  
      
    )
    
  }
  
}

export function activity() {
  return { type: MATCHEDPENDING }
}