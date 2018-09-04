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
export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
