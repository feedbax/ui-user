import React from 'react';
import styled, { css, FlattenInterpolation } from 'styled-components';
import { color, Color, ThemeProps } from 'assets/theme';

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'>;

type Apperance = {
  backgroundColor?: Color;
  position?: string;
  left?: number;
  right?: number;
  top?: number;
  transform?: string;
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

const StyledButton = styled.button<StyledProps>`
  padding: 0;
  position: absolute;
  right: 15px;
  top: 50%;
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
    const { backgroundColor } = apperance;

    return css`
      ${transform && `transform: ${transform};`}
      ${top && `top: ${top}px;`}
      ${left && `left: ${left}px;`}
      ${right && `right: ${right}px;`}
      ${position && `position: ${position};`}

      ${
        backgroundColor &&
        css`
          background-color: ${color(backgroundColor)};
        `
      }
    `;
  }}

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

function Button({ apperance, size = 20, disabled = false, icon, ...props }: Props): JSX.Element {
  return (
    <StyledButton
      apperance={apperance}
      size={size}
      disabled={disabled}
      className={`feedbax-icon icon-${icon}`}
      {...props}
    />
  );
}

export default React.memo(Button);
