import styled from 'styled-components/native';
import { ThemeType } from '../../utils/types';

interface IProps {
  theme: ThemeType;
  height: number;
}

export const HeaderWrapper = styled.View<IProps>`
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.theme.colors.primary};
  border-bottom-left-radius: 25px;
  overflow: hidden;
`;

export const ArrowContainer = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  bottom: 5px;
  border-radius: 15px;
  width: 30px;
  height: 30px;
  background-color: #cccccc;
  z-index: 1;
`;