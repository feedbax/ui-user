import React, { ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { fontFamily, color, Color, ColorFn } from 'assets/theme';
import { FooterProps } from './Footer';

interface StyledProps {
  textColor: Color;
}

interface Props {
  children: ReactNode;
}

const StyledText = styled.div<StyledProps>`
  font-family: ${fontFamily('secondaryAccent')};
  font-size: 16px;
  color: ${({ textColor }): ColorFn => color(textColor)};
`;

const Text = ({ children }: Props): JSX.Element => {
  const { color: _color } = useContext(FooterProps);
  return <StyledText textColor={_color}>{children}</StyledText>;
};

export default React.memo(Text);
