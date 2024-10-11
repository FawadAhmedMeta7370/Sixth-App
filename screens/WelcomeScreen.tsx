import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../Store/auth-context';

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [message, setmessage] = useState();

  let url = 'https://authentication-app-1cba0-default-rtdb.firebaseio.com/message.json?auth=' + token;

  useEffect(() => {
    async function fetchmessage() {
      const fetchedmessage = await axios.get(url);
      setmessage(fetchedmessage.data);
    }
    fetchmessage();
  }, [axios.get, url]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
