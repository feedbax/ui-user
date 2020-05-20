import { css } from 'styled-components';

import type { ControlProps } from './types';
import type { Style } from 'assets/styles/theme';

export const controlStyle = css<ControlProps>`
  position: absolute;
  width: 50%;
  height: 100%;
  z-index: 2;

  top: 0;

  font-family: feedbax-icons;
  vertical-align: baseline;
  font-weight: normal;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  ${({ type }): Style => css`
    ${type === 'left' ? 'left: 0;' : ''}
    ${type === 'right' ? 'right: 0;' : ''}

    &::after {
      ${type === 'left' ? "content: '\\e804';" : ''}
      ${type === 'right' ? "content: '\\e805';" : ''}

      position: absolute;
      ${type === 'left' ? 'left: -15px;' : ''}
      ${type === 'right' ? 'right: -15px;' : ''}
    }
  `}
`;
