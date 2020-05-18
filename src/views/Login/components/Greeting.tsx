import React, { ReactNode } from 'react';
import styled from 'styled-components';
import media from 'assets/styles/media-queries';
import { color, fontFamily } from 'assets/styles/theme';

interface Props {
  children: ReactNode;
}

const mq = media('xs', 'sm', 'md');
const StyledText = styled.div`
  color: ${color('primary')};
  font-family: ${fontFamily('secondary')};
  font-weight: bold;
  text-align: center;

  ${mq`
    font-size: ${[82, 92, 102]}px;
  `}
`;

const Greeting = ({ children }: Props): JSX.Element => <StyledText>{children}</StyledText>;

export default React.memo(Greeting);
