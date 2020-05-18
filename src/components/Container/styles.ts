import { css } from 'styled-components';
import { color, fontFamily } from 'assets/styles/theme';

import type { Style } from 'assets/styles/theme';
import type { Styles, StyledProps } from './types';

export const wrapperStyles = css<StyledProps & Styles>`
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

export const contentStyles = css<Styles>`
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
