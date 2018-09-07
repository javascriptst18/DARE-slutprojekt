import db from '../../firebase';

export function checkIfUserExists(user) {
  return function (dispatch, done) {
    return db.collection('users').doc(user).get()
      .then((response) => {
        dispatch({ type: 'CHECK_USER', value: response.exists })
      })
  }
}

export function login(user) {
  return function (dispatch) {
    dispatch({ type: 'LOGIN', value: user.email })
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: 'LOGOUT', value: null })
  }
}
