import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color } from 'assets/theme';
import { useSelector } from 'react-redux';
import { currentQuestionSelector } from 'store/selectors';
import { isWriteAble } from '@feedbax/api/store/questions/types';

interface Props {
  children: ReactNode;
}

const StyledBox = styled.div`
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

const WriteAnswer = ({ children }: Props): JSX.Element => {
  const currentQuestion = useSelector(currentQuestionSelector);

  if (isWriteAble(currentQuestion)) {
    return <StyledBox>{children}</StyledBox>;
  }

  return <></>;
};

export default WriteAnswer;
