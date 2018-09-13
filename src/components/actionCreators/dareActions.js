import db from '../../firebase';
import {
  POSTDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE, MATCHEDDARE, QUEUE, NODARE, USERMATCH, MATCHEDPENDING, MATCHEDACCEPTED, STATUSFAILED
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
          collection: 'userMatch',
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
        pending => dispatch({ id: pending.id, collection: 'matchedDare', type: MATCHEDPENDING }),
        error => dispatch({ error, type: FAILEDTODARE }),
      );
  }
}

export function inQueue(dare) {
  return { type: QUEUE, dare }
}

export function userMatched(data) {
  return function (dispatch, getState) {
    let tempArr = [];
    return db.collection('matchedDare').where('userMatchId', '==', data.id).get()
      .then((result) => {
        result.forEach((doc) => {
          let activitymatch = doc.data();
          tempArr.push(activitymatch);
        })
      })
      .then(() => {
        if (tempArr.length === 1) {
          dispatch({ userMatch: data, activityMatch: tempArr[0], type: MATCHEDPENDING })
        }
        else dispatch({ type: USERMATCH, userMatch: data })
      })
  }
}

export function noDare() {
  return { type: NODARE }
}

export function activity() {
  return { type: MATCHEDPENDING }
}
