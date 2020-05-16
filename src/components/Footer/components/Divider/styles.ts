import { css } from 'styled-components';
import media from 'lib/media-queries';
import { color } from 'assets/theme';

import type { ColorFn } from 'assets/theme';
import type { StyledProps } from './types';

const mq = media('xs', 'sm', 'md');
export const dividerStyles = css<StyledProps>`
  width: 100%;
  margin-top: 26px;
  margin-bottom: 18px;
  border-bottom: 1px solid;
  border-color: ${({ borderColor }): ColorFn => color(borderColor)};

  ${mq`
    max-width: ${[200, 250, 300]}px;
  `}
`;
