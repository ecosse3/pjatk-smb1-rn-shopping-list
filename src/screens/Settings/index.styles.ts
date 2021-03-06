import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { rgba } from 'polished';
import { ThemeType } from 'types';

interface IButtonsProps {
  theme: ThemeType;
  disabled?: boolean;
  backgroundColor?: string;
}

export const MiddleView = styled.View`
  padding: 16px 16px 0 16px;
`;

export const AuthorView = styled.View`
  padding-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 24px 16px 8px 16px;
`;

export const NameInput = styled(TextInput)`
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity<IButtonsProps>`
  background: ${(props) =>
    props.disabled ? rgba(props.theme.colors.primary, 0.5) : props.theme.colors.primary};
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;

  ${(props) =>
    props.backgroundColor &&
    css`
      background: ${props.backgroundColor};
    `}
`;

export const TextButton = styled.Text<{
  size?: number;
  color?: string;
  padding?: string;
  button?: boolean;
}>`
  font-size: ${(props) => (props.size ? `${props.size}px` : '20px')};
  font-weight: 500;
  color: ${(props) => (props.color ? props.color : props.button ? 'white' : 'black')};
  padding: ${(props) => (props.button ? '0px' : props.padding || '20px')};
`;
