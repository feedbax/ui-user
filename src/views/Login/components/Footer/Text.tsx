import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { fontFamily } from 'assets/theme';

interface Props {
  children: ReactNode;
}

const StyledText = styled.div`
  font-family: ${fontFamily('secondaryAccent')};
  font-size: 16px;
`;

const Text = ({ children }: Props): JSX.Element => <StyledText>{children}</StyledText>;

export default React.memo(Text);
