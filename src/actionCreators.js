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

/* export const SignIn = () => (dispatch) => {
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => { })
    .catch((error) => {
      console.log(error);
    });
};

export const SignOut = () => (dispatch) => {
  firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
    });
}; */
