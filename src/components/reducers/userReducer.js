
//  Check if currently logged in user is registered
export const isRegistered = function (state = null, action) {
  switch (action.type) {
    case 'CHECK_USER':
      return action.value;
    default:
      return null;
  }
}
//  Sets the current user
export const user = function (state = null, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.value;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}
