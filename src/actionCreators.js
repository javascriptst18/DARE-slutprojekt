import { POSTDARE, ACCEPTDARE, DECLINEDARE } from './index';
import firebase from './firebase';

export function postDare(dare) {
  firebase.database().ref('/que')
    .push(dare);
  return {
    type: POSTDARE,
    current: true,
  };
}

export function acceptDare(dare) {
    
}