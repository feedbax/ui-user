import { css } from 'styled-components';
import { color, fontFamily } from 'assets/styles/theme';

import type { StyledProps } from './types';

const paddingRightProp = (
  ({ paddingRight = 65 }: StyledProps): string => (
    `${paddingRight}px`
  )
);

export const textAreaStyles = css<StyledProps>`
  font-size: 16px;
  resize: none;
  border: 0;
  outline: 0;
  max-height: 116px;
  padding: 20px 15px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0;

  background-color: ${color('accent1')};
  font-family: ${fontFamily('secondaryAccent')};
  color: ${color('primary')};
  padding-right: ${paddingRightProp};

  &::placeholder {
    color: ${color('primary')};
    opacity: 0.7;
  }
`;
