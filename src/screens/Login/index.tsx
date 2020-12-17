import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { Container, Text, Button, NameInput, WaveHand } from './index.styles';
import { tabBarVisibleState } from '../../store';
import { LoginStackParamList, ThemeType } from '../../utils/types';
import RegisterScreen from '../Register';

interface IProps {
  theme: ThemeType;
}

const LoginScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);

  const navigation = useNavigation<StackNavigationProp<LoginStackParamList>>();

  const login = async () => {
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in!');
          setTabBarVisible(true);
          navigation.push('ShoppingListScreen');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              console.error('Adres email jest niepoprawny!');
              break;

            case 'auth/user-not-found':
              console.error('Taki użytkownik nie istnieje! Zarejestruj się!');
              break;

            case 'auth/wrong-password':
              console.error('Błędne hasło!');
              break;

            default:
              console.error(error);
              break;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <WaveHand>👋</WaveHand>
      <Text>Zaloguj się</Text>
      <NameInput
        theme={{
          colors: {
            primary: theme.colors.primary,
            underlineColor: 'transparent'
          }
        }}
        mode="outlined"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <NameInput
        theme={{
          colors: {
            primary: theme.colors.primary,
            underlineColor: 'transparent'
          }
        }}
        mode="outlined"
        placeholder="Hasło"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button disabled={email.length === 0 || password.length === 0} onPress={() => login()}>
        <Text button>Zaloguj</Text>
      </Button>
      <Button backgroundColor="#cb3b3b" onPress={() => navigation.navigate('RegisterScreen')}>
        <Text button>Zarejestruj się</Text>
      </Button>
    </Container>
  );
};

const Stack = createStackNavigator<LoginStackParamList>();

const Login: React.FC<IProps> = ({ theme }: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        children={() => <LoginScreen theme={theme} />}
        options={{
          header: () => null
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        children={() => <RegisterScreen theme={theme} />}
        options={{
          title: 'Rejestracja',
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: { backgroundColor: theme.colors.secondary }
        }}
      />
    </Stack.Navigator>
  );
};

export default Login;