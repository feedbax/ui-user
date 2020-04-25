import React, { ReactNode, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { fontFamily, color, Color, ColorFn } from 'assets/theme';
import { FooterProps } from './Footer';

interface StyledProps {
  to: string;
  children: ReactNode;
  textColor: Color;
}

interface Props {
  to: string;
  children: ReactNode;
  className?: string;
}

const CustomLink = ({ textColor: _, ...props }: StyledProps): JSX.Element => (
  <RouterLink {...props} />
);

const StyledLink = styled(CustomLink)<StyledProps>`
  font-family: ${fontFamily('secondaryAccent')};
  font-size: 16px;
  color: ${({ textColor }): ColorFn => color(textColor)};
`;

const Link = ({ children, to }: Props): JSX.Element => {
  const { color: _color } = useContext(FooterProps);

  return (
    <StyledLink to={to} textColor={_color}>
      {children}
    </StyledLink>
  );
};

export default React.memo(Link);
