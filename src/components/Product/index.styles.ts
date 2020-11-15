import styled from 'styled-components/native';
import { rgba } from 'polished';
import { ThemeType } from '../../utils/SCThemeProvider';

interface IProps {
  theme: ThemeType;
}

export const TouchableContainer = styled.TouchableHighlight<IProps>`
  width: 95%;
  height: 60px;
  background-color: ${(props) => rgba(props.theme.colors.primary, 0.2)};
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
`;

export const InfoContainer = styled.View`
  margin-left: 10px;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  top: 10px;
  right: 15px;
`;

export const Remove = styled.TouchableOpacity<IProps>`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: ${(props) => rgba(props.theme.colors.secondary, 0.2)};
  justify-content: center;
  align-items: center;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 2px;
`;

export const Price = styled.Text`
  color: #979797;
  font-size: 12px;
`;

export const Quantity = styled.Text`
  font-size: 9px;
  font-style: italic;
`;