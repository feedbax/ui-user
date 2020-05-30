import React from 'react';
import styled, { css, FlattenInterpolation } from 'styled-components';
import { color, Color, ThemeProps } from 'assets/theme';

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'>;

type Apperance = {
  textColor?: Color;
  backgroundColor?: Color;
  position?: string;
  left?: number;
  right?: number;
  top?: number | [number, string];
  transform?: string;
  padding?: number;
  opacity?: number;
};

type StyledProps = {
  size: number;
  apperance?: Apperance;
};

interface Props extends ButtonProps {
  icon?: string;
  size?: number;
  apperance?: Apperance;
}

const StyledButtonIcon = styled.div<StyledProps>`
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
      box-shadow: ${shadowXY}px ${shadowXY}px ${shadowBlur}px rgba(0, 0, 0, 0.18), 
                  -${shadowXY}px -${shadowXY}px ${shadowBlur}px rgba(255, 255, 255, 0.18);
    `;
  }}
`;

const StyledButton = styled.button<StyledProps>`
  padding: 0;
  position: relative;
  flex: 0 0 auto;
  border: 0;
  outline: 0;
  border-radius: 50%;
  transition: transform 0.3s ease;
  cursor: pointer;
  color: #fff;

  &:disabled ${StyledButtonIcon} {
    opacity: 0.5;
  }

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
      ${transform && `transform: ${transform};`}
      ${topProp}
      ${leftProp}
      ${rightProp}
      ${position && `position: ${position};`}
      ${padding && `padding: ${padding}px;`}
      ${opacityProp}

      ${
        backgroundColor &&
        css`
          background-color: ${color(backgroundColor)};
        `
      }

      ${
        textColor &&
        css`
          color: ${color(textColor)};
        `
      }
    `;
  }}
`;

function Button({ apperance, size = 20, disabled = false, icon, ...props }: Props): JSX.Element {
  return (
    <StyledButton apperance={apperance} size={size} disabled={disabled} {...props}>
      <StyledButtonIcon size={size} className={`feedbax-icon icon-${icon}`} />
    </StyledButton>
  );
}

export default React.memo(Button);
