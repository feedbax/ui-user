import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color, fontFamily } from 'assets/theme';
import media from 'lib/media-queries';

interface Props {
  children: ReactNode;
  bgProtrait: string;
  bgLandscape: string;
}

const StyledWrapper = styled.div<Props>`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-size: cover;
  background-position: center;
  font-family: ${fontFamily('primary')};
  color: ${color('primary')};

  & .logo-link {
    text-decoration: none;
  }

  a {
    color: ${color('primary')};
  }

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
  width: 100%;
  margin: auto;
  color: ${color('primary')};
  padding: 25px 15px;
  box-sizing: border-box;

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