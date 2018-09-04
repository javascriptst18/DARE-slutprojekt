import firebase, { provider } from './firebase';

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

import { POSTDARE, ACCEPTDARE, DECLINEDARE } from './index';
import db from './firebase';

export function postDare(dare) {
  db.collection('que').add(dare);
  return {
    type: POSTDARE,
    current: true,
    data: dare
  };
}

export function acceptDare(dare) {

}
