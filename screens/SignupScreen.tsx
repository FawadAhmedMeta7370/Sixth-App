import {Alert} from 'react-native';
import {createUser} from '../Util/Auth';
import {useContext, useState} from 'react';
import {AuthContext} from '../Store/auth-context';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignupScreen() {
  const authCtx = useContext(AuthContext);

  const [authenticating, setAuthenticating] = useState(false); // for loading while signing up or logging in

  async function signupHandler({email, password}: any) {
    setAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Signup Failed', 'Irrelevent credentials!.....');
    }
    setAuthenticating(false);
  }

  if (authenticating) {
    return <LoadingOverlay message="Creating User!.................." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
