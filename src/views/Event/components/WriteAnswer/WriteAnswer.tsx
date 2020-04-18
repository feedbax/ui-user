import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color } from 'assets/theme';

interface Props {
  children: ReactNode;
}

const StyledBox = styled.div`
  position: relative;
  background-color: ${color('accent1')};
  box-sizing: border-box;
  min-width: 0px;
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

const WriteAnswer = ({ children }: Props): JSX.Element => <StyledBox>{children}</StyledBox>;

export default WriteAnswer;
