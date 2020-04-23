import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color } from 'assets/theme';

interface Props {
  children: ReactNode;
  bgProtrait: string;
  bgLandscape: string;
}

const StyledWrapper = styled.div<Props>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  max-width: 540px;
  height: 100%;
  max-height: 100%;
  color: ${color('accent1')};
  width: 100%;

  @media (min-width: 540px) {
    max-height: 800px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.5);
  }
`;

const Container = ({ children, bgProtrait, bgLandscape }: Props): JSX.Element => (
  <StyledWrapper bgProtrait={bgProtrait} bgLandscape={bgLandscape}>
    <StyledContent>{children}</StyledContent>
  </StyledWrapper>
);

export default Container;
