import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ThemeType } from 'types';
import { useGeolocation } from 'hooks/useGeolocation';
import {
  nearbyAddressState,
  storeInEditModeState,
  tabBarVisibleState,
  useAddEditFavoriteStore
} from 'store';
import Header from 'components/Header';
import { Fieldset } from 'components/Fieldset';
import { RadioButton } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { format, parseISO } from 'date-fns';
import {
  Text,
  Button,
  Input,
  Container,
  ButtonsContainer,
  InputsContainer,
  Error,
  Bold
} from './index.styles';

interface IProps {
  theme: ThemeType;
}

type RoutePropsType = {
  params?: {
    id?: string;
    name?: string;
    description?: string;
    radius?: number;
    longitude?: number;
    latitude?: number;
    address?: string;
    color?: string;
    updatedAt?: string;
    createdAt?: string;
  };
};

const AddEditFavoriteStoreScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const position = useGeolocation();

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);
  const nearbyAddress = useRecoilValue(nearbyAddressState);
  const storeInEditMode = useRecoilValue(storeInEditModeState);

  const addEditFavoriteStore = useAddEditFavoriteStore();
  const navigation = useNavigation();
  const route: RoutePropsType = useRoute();

  const propsStoreId = route?.params?.id;
  const propsStoreName = route?.params?.name;
  const propsStoreDescription = route?.params?.description;
  const propsStoreRadius = route?.params?.radius;
  const propsStoreLongitude = route?.params?.longitude;
  const propsStoreLatitude = route?.params?.latitude;
  const propsStoreAddress = route?.params?.address;
  const propsStoreColor = route?.params?.color;
  const propsStoreUpdatedAt = route?.params?.updatedAt;
  const propsStoreCreatedAt = route?.params?.createdAt;

  const [storeName, setStoreName] = useState(propsStoreName || '');
  const [storeDescription, setStoreDescription] = useState(propsStoreDescription || '');
  const [storeRadius, setStoreRadius] = useState(propsStoreRadius?.toString() || '');
  const [storeColor, setStoreColor] = useState(propsStoreColor || 'red');

  const storeLongitude = propsStoreLongitude || position.longitude;
  const storeLatitude = propsStoreLatitude || position.latitude;
  const storeAddress = propsStoreAddress || nearbyAddress;

  const priceRegex = /^\d+$/;

  const checkAddFavoriteStore = (
    id: string,
    name: string,
    description: string,
    radius: string,
    longitude: number,
    latitude: number,
    address: string,
    color: string
  ) => {
    addEditFavoriteStore({
      id,
      name,
      description,
      radius: Number(radius),
      longitude,
      latitude,
      address,
      color
    });

    navigation.navigate('FavoriteStoresScreen');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setTabBarVisible(true);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setTabBarVisible(false);
  }, []);

  return (
    <ScrollView>
      <Header text={storeInEditMode ? storeName : 'Dodaj sklep do ulubionych'} />
      <Container>
        <InputsContainer>
          <Input
            theme={{
              colors: {
                primary: theme.colors.primary,
                underlineColor: 'transparent'
              }
            }}
            mode="outlined"
            label="Nazwa"
            maxLength={20}
            onChangeText={(text) => setStoreName(text)}
            value={storeName}
          />
          <Input
            theme={{
              colors: {
                primary: theme.colors.primary,
                underlineColor: 'transparent'
              }
            }}
            mode="outlined"
            label="Opis"
            onChangeText={(text) => {
              setStoreDescription(text);
            }}
            value={storeDescription}
          />
          <Input
            theme={{
              colors: {
                primary: theme.colors.primary,
                underlineColor: 'transparent'
              }
            }}
            mode="outlined"
            keyboardType="number-pad"
            label="Promień (m)"
            onChangeText={(text) => {
              setStoreRadius(text);
            }}
            value={storeRadius}
          />
          {storeRadius.length > 0 && Number.isNaN(Number(storeRadius)) && (
            <Error
              type="error"
              visible={storeRadius.length > 0 && Number.isNaN(Number(storeRadius))}>
              Proszę wprowadzić liczbę!
            </Error>
          )}
          {storeRadius.length !== 0 && Number(storeRadius) < 50 && (
            <Error
              type="error"
              visible={storeRadius.length !== 0 && Number(storeRadius) < 50}>
              Promień nie może być mniejszy niż 50 metrów!
            </Error>
          )}
          <Fieldset title="Kolor wskaźnika">
            <RadioButton.Group
              onValueChange={(newColor) => setStoreColor(newColor)}
              value={storeColor}>
              <View style={{ flexDirection: 'row' }}>
                <RadioButton value="red" color="red" uncheckedColor="red" />
                <RadioButton value="blue" color="blue" uncheckedColor="blue" />
                <RadioButton value="indigo" color="indigo" uncheckedColor="indigo" />
                <RadioButton value="gold" color="gold" uncheckedColor="gold" />
                <RadioButton value="green" color="green" uncheckedColor="green" />
              </View>
            </RadioButton.Group>
          </Fieldset>
          <Fieldset
            title={storeInEditMode ? 'Lokalizacja sklepu' : 'Aktualna lokalizacja'}>
            <Text size={14} noPadding>
              <Bold>Adres:</Bold> {storeAddress}
            </Text>
            <Text size={14} noPadding>
              <Bold>Szerokość geograficzna:</Bold> {storeLatitude}
            </Text>
            <Text size={14} noPadding>
              <Bold>Długość geograficzna:</Bold> {storeLongitude}
            </Text>
          </Fieldset>
        </InputsContainer>
        <ButtonsContainer>
          {storeInEditMode && propsStoreCreatedAt && (
            <Fieldset title="Informacje">
              <Text size={14} noPadding>
                <Bold>Utworzono: </Bold>
                {format(parseISO(propsStoreCreatedAt), "dd/MM/yyyy 'o godz.' HH:mm")}
              </Text>
              {propsStoreUpdatedAt && (
                <Text size={14} noPadding>
                  <Bold>Ostatnia modyfikacja: </Bold>
                  {format(parseISO(propsStoreUpdatedAt), "dd/MM/yyyy 'o godz.' HH:mm")}
                </Text>
              )}
            </Fieldset>
          )}
          <Button
            disabled={
              storeName.length === 0 ||
              storeDescription.length === 0 ||
              storeRadius.length === 0 ||
              !priceRegex.test(storeRadius) ||
              Number(storeRadius) < 50
            }
            onPress={() =>
              checkAddFavoriteStore(
                propsStoreId || uuidv4(),
                storeName,
                storeDescription,
                storeRadius,
                storeLongitude,
                storeLatitude,
                storeAddress,
                storeColor
              )
            }>
            <Text button>Zapisz</Text>
          </Button>
        </ButtonsContainer>
      </Container>
    </ScrollView>
  );
};

export default AddEditFavoriteStoreScreen;
