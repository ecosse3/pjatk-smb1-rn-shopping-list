import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { View } from 'react-native';

import { AddIconActions, AddIconActionsType } from 'types';
import { productInEditModeState, storeInEditModeState } from 'store';
import { Container } from './index.styles';

interface IAddIconProps {
  action: AddIconActionsType;
}

const AddIcon: React.FC<IAddIconProps> = ({ action }) => {
  const navigation = useNavigation();
  const setProductInEditMode = useSetRecoilState(productInEditModeState);
  const setStoreInEditMode = useSetRecoilState(storeInEditModeState);

  const getAction = () => {
    switch (action) {
      default:
      case AddIconActions.ADD_PRODUCT:
        navigation.navigate('AddEditProductScreen');
        setProductInEditMode(false);
        break;

      case AddIconActions.ADD_STORE:
        navigation.navigate('AddEditFavoriteStoreScreen');
        setStoreInEditMode(false);
        break;
    }
  };

  return (
    <View>
      <Container onPress={() => getAction()}>
        <Icon name="plus" size={20} color="#FFFFFF" />
      </Container>
    </View>
  );
};

export default AddIcon;
