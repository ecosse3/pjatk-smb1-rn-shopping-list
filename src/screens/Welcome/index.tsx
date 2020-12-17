import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Text, Button, NameInput, WaveHand } from './index.styles';
import { usernameState } from '../../store';
import { ThemeType, WelcomeStackParamList } from '../../utils/types';
import LoginScreen from '../Login';

interface IProps {
  theme: ThemeType;
}

const WelcomeScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const [username, setUsername] = useRecoilState(usernameState);

  const navigation = useNavigation();

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('@username', username);
      navigation.navigate('LoginScreen');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <WaveHand>👋</WaveHand>
      <Text>Witaj, podaj swoje imię!</Text>
      <NameInput
        theme={{
          colors: {
            primary: theme.colors.primary,
            underlineColor: 'transparent'
          }
        }}
        mode="outlined"
        placeholder="Imię"
        maxLength={15}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Button disabled={username.length === 0} onPress={() => saveName()}>
        <Text button>Zapisz</Text>
      </Button>
    </Container>
  );
};

const Stack = createStackNavigator<WelcomeStackParamList>();

const Welcome: React.FC<IProps> = ({ theme }: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        children={() => <WelcomeScreen theme={theme} />}
        options={{
          header: () => null
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        children={() => <LoginScreen theme={theme} />}
        options={{
          header: () => null
        }}
      />
    </Stack.Navigator>
  );
};

export default Welcome;
