import React, { ReactNode } from 'react';
import styled, { css, FlattenInterpolation } from 'styled-components';
import { color, fontFamily, ThemeProps } from 'assets/theme';

type Style = FlattenInterpolation<ThemeProps>;

interface Styles {
  styles?: Style;
}

interface StyledProps {
  bgProtrait: string;
  bgLandscape: string;
}

interface Props {
  children: ReactNode;
  bgProtrait: string;
  bgLandscape: string;
  styles?: {
    wrapper?: Style;
    content?: Style;
  };
}

const StyledWrapper = styled.div<StyledProps & Styles>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  overflow: auto;
  background-size: cover;
  background-position: center;

  color: ${color('primary')};

  ${(props): Style => css`
    @media (orientation: portrait) {
      background-image: url(${props.bgProtrait});
    }

    @media (orientation: landscape) {
      background-image: url(${props.bgLandscape});
    }
  `}

  ${(props): Style | string => (props.styles ? props.styles : '')}
`;

const StyledContent = styled.div<Styles>`
  position: relative;

  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  flex: 1 1 auto;
  padding: 15px;
  box-sizing: border-box;

  font-family: ${fontFamily('primary')};
  color: ${color('primary')};

  a {
    color: ${color('primary')};
  }

  ${(props): Style | string => (props.styles ? props.styles : '')}
`;

const Container = ({ children, bgProtrait, bgLandscape, styles }: Props): JSX.Element => (
  <StyledWrapper
    bgProtrait={bgProtrait}
    bgLandscape={bgLandscape}
    styles={styles?.wrapper}
    data-scroll-lock-scrollable
  >
    <StyledContent styles={styles?.content}>{children}</StyledContent>
  </StyledWrapper>
);

export default React.memo(Container);
