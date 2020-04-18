import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color } from './Form/Button/node_modules/assets/theme';
import media from './Form/Button/node_modules/lib/media-queries';

interface Props {
  children: ReactNode;
  bgProtrait: string;
  bgLandscape: string;
}

const StyledWrapper = styled.div<Props>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  overflow: auto;
  background-size: cover;
  background-position: center;

  ${(props): string => `
    @media (orientation: portrait) {
      background-image: url(${props.bgProtrait});
    }

    @media (orientation: landscape) {
      background-image: url(${props.bgLandscape});
    }
  `}
`;

const mq = media('xs', 'sm', 'md');
const StyledContent = styled.div`
  flex: 1 1 auto;
  margin: auto;
  color: ${color('primary')};

  ${mq`
    max-width: ${[380, 440, 500]}px;
  `}
`;

const Container = ({ children, bgProtrait, bgLandscape }: Props): JSX.Element => (
  <StyledWrapper bgProtrait={bgProtrait} bgLandscape={bgLandscape}>
    <StyledContent>{children}</StyledContent>
  </StyledWrapper>
);

export default React.memo(Container);
