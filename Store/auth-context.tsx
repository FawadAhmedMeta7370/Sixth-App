import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token: any) => {},
  logout: () => {},
});

function AuthContextProvider({children}: any) {
    
  const [authToken, setauthtoken] = useState<string | null>();

  function authenticator(token: string) {
    setauthtoken(token);
    AsyncStorage.setItem('token', token)
  }

  function logouter() {
    setauthtoken(null);
    AsyncStorage.removeItem('token')
  }

  const value:any = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticator,
    logout: logouter,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
