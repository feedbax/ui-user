import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color, fontFamily } from 'assets/styles/theme';

interface Props {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledButton = styled.button<Props>`
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

export default function Button({ children, onClick }: Props): JSX.Element {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
