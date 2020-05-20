import { css } from 'styled-components';
import type { PaginationDotProps } from './types';
import type { Style } from 'assets/styles/theme';

export const paginationDotStyle = css<PaginationDotProps>`
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 2px;

  transition: transform 0.3s ease, opacity 0.3s ease;

  ${(props): Style => css`
    transform: scale(${props.active ? 1 : 0.6});
    opacity: ${props.active ? 1 : 0.6};
  `}
`;

export const wrapperStyle = css`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
