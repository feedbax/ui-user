import { css } from 'styled-components';
import media from 'assets/styles/media-queries';

import { fontFamily, color } from 'assets/styles/theme';

import type { Style } from 'assets/styles/theme';
import type { StyledProps } from './types';


const mq = media('xs', 'sm', 'md');

export const buttonStyles = css<StyledProps>`
  cursor: pointer;
  font-weight: bold;
  border-radius: 0;
  width: 100%;
  text-align: left;
  font-family: ${fontFamily('secondary')};
  color: ${color('primary')};
  background-color: ${color('accent1')};

  outline: 0;
  border: 0;

  ${(props: StyledProps): Style => mq`
    height: ${props?.height || 'auto'}px;
    font-size: ${[18, 22, 26]}px;
    padding: ${[12, 16, 20]}px ${[28, 32, 36]}px;
  `}
`;
