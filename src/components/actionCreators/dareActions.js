import db from '../../firebase';
import {
  POSTDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE, 
} from '../../constants';

export function signIn(user) {
  return {
    type: 'LOGIN',
    payload: user,
  };
}

export function signOut(user) {
  return {
    type: 'LOGOUT',
    payload: user,
  };
}

export function postDare(dare, email) {
  return function (dispatch, getState) {
    return db.collection('queue').doc(email).set(dare)
      .then(
        posted => dispatch({ posted, current: true, type: POSTDARE }),
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

export function addUserSettings(user) {
  db.collection('users').doc(user.name).set(user).then((response) => {
    console.log(response.data());
  })
    .catch((error) => {
      console.error(error);
    });
}

//  Input: string
//  Creates: Empty document in users with name as document ID
export function addEmptyUser(user) {
  db.collection('users').doc(user).set({ name: user }).then((response) => {
    return response;
  })
    .catch((error) => {
      console.error(error);
    });
}

//  Input: object with name and other keys to set
//  Creates: Appends information to existing object
export function updateExistingUser(user) {
  console.log('update existing user with: ', user);
  db.collection('users').doc(user.name).set(user, { merge: true }).then((response) => {
    console.log(response);
  })
    .catch((error) => {
      console.log(error);
    });
}
