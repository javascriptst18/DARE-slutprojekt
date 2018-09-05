//  Inside of firebase.js file
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD6uZ0MZvzpPU7AiiB0ImnWfagoBZqmlHU',
  authDomain: 'dare-2dd84.firebaseapp.com',
  databaseURL: 'https://dare-2dd84.firebaseio.com',
  projectId: 'dare-2dd84',
  storageBucket: 'dare-2dd84.appspot.com',
  messagingSenderId: '665169555641',
};

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

export const provider = new firebase.auth.GoogleAuthProvider();
export { firebase };
export default db;

/*FIRESTORE DATE FORMATTING
  * Old: const date = snapshot.get('created_at');
  * New:
  * const timestamp = snapshot.get('created_at');
  * const date = timestamp.toDate(); */

