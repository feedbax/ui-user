import { css } from 'styled-components';
import media from 'lib/media-queries';

import type { FlattenInterpolation } from 'styled-components';
import type { ThemeProps } from 'assets/theme';
import type { StyledProps } from './types';

const mq = media('xs', 'sm', 'md');

export const imageStyles = css<StyledProps>`
  ${(props): FlattenInterpolation<ThemeProps> => mq`
    width: ${props.apperance.width}px;
    height: ${props.apperance.height}px;
    marginBottom: ${props.apperance.marginBottom}px;
  `}
`;
