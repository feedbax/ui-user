import { css } from 'styled-components';
import { color, fontFamily } from 'assets/styles/theme';

export const buttonStyles = css`
  position: relative;
  width: 100%;
  height: 60px;

  border: 0;
  outline: 0;
  cursor: pointer;

  padding: 0;
  margin: 0;

  font-size: 18px;
  font-family: ${fontFamily('secondary')};
  background-color: ${color('accent1')};
  color: ${color('primary')};
`;
