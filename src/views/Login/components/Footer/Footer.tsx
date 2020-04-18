import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Footer = ({ children }: Props): JSX.Element => <StyledFooter>{children}</StyledFooter>;

export default React.memo(Footer);
