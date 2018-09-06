import db from './firebase';
import { POSTDARE, ACCEPTDARE, DECLINEDARE, FAILEDTODARE } from './constants';

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

export function postDare(dare) {
  return function (dispatch, getState) {
    return db.collection('queue').add(dare)
      .then(
        posted => dispatch({ id: posted.id, collection: 'queue', current: true, type: POSTDARE }),
        error => dispatch({ error, type: FAILEDTODARE }),
      );
  }
}

/** .then(
        posted => dispatch({ posted, current: true, type: POSTDARE }),
       error => dispatch({ error, type: FAILEDTODARE }),
      ); */

export function acceptDare(dare) {

}

export function addUserSettings(user) {
  db.collection('users').doc(user.name).set(user)
    .then((response) => { //  Adds with user.name as document id
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

//  Input: string
//  Creates: Empty document in users with name as document ID
export function addEmptyUser(user) {
  db.collection('users').doc(user).set({})
    .then(response => response)
    .catch((error) => {
      console.error(error);
    });
}

//  Input: object with name and other keys to set
//  Creates: Appends information to existing object
export function updateExistingUser(user) {
  db.collection('users').doc(user.name).set({}, { merge: true }).then((response) => {
    console.log(response);
  })
    .catch((error) => {
      console.log(error);
    });
}

export function getExistingUser(user) {
  db.collection('users').doc(user).get().then((response) => {
    let res = '';
    if (response.exists) {
      //  User exists but no keys exist for user
      if (!('name' in response.data())) {
        res = 'empty user';
        //  User exists and have data
      } else {
        res = response.data();
      }
    }
    //  User doesnt exist at all, create a new user
    else {
      res = 'user doesnt exist';
    }
    return res;
  })
    .catch((error) => {
      console.log(error);
    });
}
