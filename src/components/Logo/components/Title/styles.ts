import media from 'assets/styles/media-queries';
import { css } from 'styled-components';
import { fontFamily, color } from 'assets/styles/theme';

import type { FlattenInterpolation } from 'styled-components';
import type { ThemeProps } from 'assets/styles/theme';
import type { StyledProps } from './types';

const mq = media('xs', 'sm', 'md');

export const textStyles = css<StyledProps>`
  font-family: ${fontFamily('secondary')};
  color: ${color('primary')};
  font-weight: bold;

  ${(props): FlattenInterpolation<ThemeProps> => mq`
    font-size: ${props.apperance.fontSize}px;
  `}
`;
