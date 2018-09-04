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