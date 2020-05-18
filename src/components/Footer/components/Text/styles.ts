import { css } from 'styled-components';
import { fontFamily, color } from 'assets/styles/theme';

import type { ColorFn } from 'assets/styles/theme';
import type { StyledProps } from './types';

export const textStyles = css<StyledProps>`
  font-family: ${fontFamily('secondaryAccent')};
  font-size: 16px;
  color: ${({ textColor }): ColorFn => color(textColor)};
`;
