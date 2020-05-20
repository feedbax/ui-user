import { css } from 'styled-components';
import { color } from 'assets/styles/theme';

export const wrapperStyles = css`
  background-color: #fff;
  flex: 0 0 auto;
  color: ${color('accent1')};
`;

export const underlayStyles = css`
  width: 100%;
  height: 25px;
  background-color: ${color('accent2')};
  position: absolute;
  z-index: 0;
`;
