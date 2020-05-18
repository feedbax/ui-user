import { css } from 'styled-components';
import { color } from 'assets/styles/theme';

import type { FlattenInterpolation } from 'styled-components';
import type { ThemeProps } from 'assets/styles/theme';
import type { StyledProps } from './types';

export const buttonIconStyles = css<StyledProps>`
  padding: 0;
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;

  ${({ size }): string => {
    const shadowXY = Math.round(size * 0.1);
    const shadowBlur = Math.round(size * 0.2);
    const fontSize = Math.round(size * 0.45);

    return `
      font-size: ${fontSize}px;
      width: ${size}px;
      height: ${size}px;
      box-shadow: ${shadowXY}px ${shadowXY}px ${shadowBlur}px rgba(0, 0, 0, 0.1),
        -${shadowXY}px -${shadowXY}px ${shadowBlur}px rgba(255, 255, 255, 0.1);
    `;
  }}
`;

export const buttonStyles = css<StyledProps>`
  padding: 0;
  position: relative;
  flex: 0 0 auto;
  border: 0;
  outline: 0;
  border-radius: 50%;
  transition: transform 0.3s ease;
  cursor: pointer;
  color: #fff;

  ${({ apperance = {} }): FlattenInterpolation<ThemeProps> => {
    const { top, left, right } = apperance;
    const { transform } = apperance;
    const { position } = apperance;
    const { backgroundColor, textColor } = apperance;
    const { padding } = apperance;
    const { opacity } = apperance;

    const _topProp = Array.isArray(top) ? `${top[0]}${top[1]}` : `${top}px`;
    const topProp = typeof top !== 'undefined' ? `top: ${_topProp};` : '';

    const leftProp = typeof left !== 'undefined' ? `left: ${left}px;` : '';
    const rightProp = typeof right !== 'undefined' ? `right: ${right}px;` : '';

    const opacityProp = typeof opacity !== 'undefined' ? `opacity: ${opacity};` : '';

    return css`
      ${topProp}
      ${leftProp}
      ${rightProp}
      ${opacityProp}

      ${position && `
        position: ${position};
      `}

      ${padding && `
        padding: ${padding}px;
      `}

      ${transform && `
        transform: ${transform};
      `}

      ${backgroundColor && css`
        background-color: ${color(backgroundColor)};
      `}

      ${textColor && css`
        color: ${color(textColor)};
      `}
    `;
  }}
`;
