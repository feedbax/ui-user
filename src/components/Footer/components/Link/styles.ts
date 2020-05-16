import { css } from 'styled-components';
import { fontFamily, color } from 'assets/theme';

import type { ColorFn } from 'assets/theme';
import type { StyledProps } from './types';

export const linkStyles = css<StyledProps>`
  font-family: ${fontFamily('secondaryAccent')} !important;
  font-size: 16px;
  color: ${({ textColor }): ColorFn => color(textColor)} !important;
`;
