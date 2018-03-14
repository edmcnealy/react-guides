import User from '../models/user';

const USER_TOKEN_KEY = 'user_token';

export function login(username, password) {
  let user = new User(username);
  localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(USER_TOKEN_KEY);
}

export function getUser() {
  let user = null;
  try {
    user = localStorage.getItem(USER_TOKEN_KEY);
    return JSON.parse(user);
  } catch(e) {
    return null;
  }
}