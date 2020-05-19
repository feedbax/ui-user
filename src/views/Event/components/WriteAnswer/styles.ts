import { css } from 'styled-components';
import { color } from 'assets/styles/theme';

export const boxStyles = css`
  position: relative;
  background-color: ${color('accent1')};
  box-sizing: border-box;
  min-width: 0px;
  width: 100%;
  margin: 0px;
  padding: 0px;
  flex: 0 1 auto;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    flex: 1 1 auto;
  }
`;
