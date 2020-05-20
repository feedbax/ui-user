import { css } from 'styled-components';

import type { FilterProps } from './types';
import type { Style } from 'assets/styles/theme';

export const filterStyle = css<FilterProps>`
  display: block;
  position: relative;

  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.3s ease, opacity 0.3s ease;

  ${(props): Style => css`
    transform: scale(${props.active ? 1 : 0.8});
    opacity: ${props.disabled ? 0.5 : 1};
  `}
`;

export const wrapperStyle = css`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
