export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// reducer(s)
export function user(state = '', action) {
  switch (action.type) {
    case 'LOGIN':
      state = action.value;
      return state;
    case 'LOGOUT':
      return '';
    default:
      return state;
  }
}
