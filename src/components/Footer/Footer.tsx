import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Color } from 'assets/theme';

interface Props {
  children?: ReactNode;
  color: Color;
}

const parentProps: Props = { color: 'primary' };
export const FooterProps = React.createContext(parentProps);

const StyledFooter = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const Footer = ({ children, color }: Props): JSX.Element => (
  <StyledFooter>
    <FooterProps.Provider value={{ color }}>{children}</FooterProps.Provider>
  </StyledFooter>
);

export default React.memo(Footer);
