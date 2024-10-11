import { login } from '../Util/Auth';
import { Alert } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../Store/auth-context';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen() {

  const authCtx = useContext(AuthContext)

  const [authenticating, setAuthenticating] = useState(false)

  async function loginHandler({email,password}:any) {
    setAuthenticating(true)
    try{
      const token = await login(email,password);
      authCtx.authenticate(token)
    } catch (erro) {
      Alert.alert('Login Failed','Wrond credentials!.....')
    }
    setAuthenticating(false)
  }

  if (authenticating) {
    return <LoadingOverlay message='Logging you !..................'/>
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
