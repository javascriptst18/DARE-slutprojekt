import db from '../../firebase';

export function checkIfUserExists(user) {
  return function (dispatch) {
    return db.collection('users').doc(user.email).get()
      .then((response) => {
        dispatch({ type: 'CHECK_USER', value: response.exists });
        if (response.exists) {
          dispatch({ type: 'SETUSERSETTINGS', value: response.data() })
        }
        else {
          dispatch({ type: 'SETUSERSETTINGS', value: { location: '', name: '', phonenumber: '', suspended: false, verified: false, suspensionEnds: 0 } })
        }
      }).then((nothing) => {
        dispatch({ type: 'LOGIN', value: user })
      })
  }
}


export function login(user) {
  return function (dispatch) {
    dispatch({ type: 'LOGIN', value: user })
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: 'LOGOUT', value: '' })
  }
}
