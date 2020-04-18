import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { fontFamily, color } from 'assets/theme';

interface StyledProps {
  to: string;
  children: ReactNode;
}

interface Props extends StyledProps {
  className?: string;
}

const CustomLink = (props: Props): JSX.Element => <RouterLink {...props} />;

const StyledLink = styled(CustomLink)<StyledProps>`
  font-family: ${fontFamily('secondaryAccent')};
  font-size: 16px;
  color: ${color('primary')};
`;

const Link = ({ children, to }: StyledProps): JSX.Element => (
  <StyledLink to={to}>{children}</StyledLink>
);

export default React.memo(Link);
