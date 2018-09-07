
//  Check if currently logged in user is registered
export const isRegistered = function (state = null, action) {
  switch (action.type) {
    case 'CHECK_USER':
      return action.value;
    default:
      return state;
  }
};

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
