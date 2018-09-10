
//  Check if currently logged in user is registered
/* export const isRegistered = function (state = null, action) {
  switch (action.type) {
    case 'CHECK_USER':
      return action.value;
    default:
      return state;
  }
}; */


const initialUserState = {
  email: '',
  isRegistered: null,
};

//  Sets the current user
export const user = function (state = initialUserState, action) {
  console.log(action)
  switch (action.type) {
    case 'LOGIN':
      return {...state, email: action.value.email};
    case 'CHECK_USER':
      return { ...state, isRegistered: action.value };
    case 'LOGOUT':
      return { email: '', isRegistered: null };
    default:
      return state;
  }
};

//  Sets the current user
export const userSettings = function (state = {}, action) {
  switch (action.type) {
    case 'SETUSERSETTINGS':
      return action.value;
    case 'UNSETUSERSETTINGS':
      return {};
    default:
      return state;
  }
};
