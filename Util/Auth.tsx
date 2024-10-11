import axios from 'axios';

const APIKEY = 'AIzaSyBOmrK-E3dddq5Ea04q7ctHK_KU3VMcMpg';

export async function authenticate(mode: any, email: any, password: any) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${APIKEY}`;
  const response = await axios.post(URL, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  // console.log("Response data --------> " + JSON.stringify(response.data,null,2));
  const token = response.data.idToken;
  return token;
}

export function createUser(email: any, password: any) {
  return authenticate('signUp', email, password);
}

export function login(email: any, password: any) {
  return authenticate('signInWithPassword', email, password);
}
