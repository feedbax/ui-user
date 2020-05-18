import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color } from 'assets/styles/theme';
import { useSelector } from 'react-redux';
import { currentQuestionSelector, selectedAnswerSelector } from 'store/selectors';
import { isVoteAble } from '@feedbax/backend-api/store/modules/questions/types';

interface Props {
  children?: ReactNode;
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

const VoteAnswer = ({ children }: Props): JSX.Element => {
  const currentQuestion = useSelector(currentQuestionSelector);
  const selectedAnswer = useSelector(selectedAnswerSelector);

  const answerSelected = selectedAnswer !== null;

  if (isVoteAble(currentQuestion) && answerSelected) {
    return <StyledBox>{children}</StyledBox>;
  }

  return <React.Fragment />;
};

export default VoteAnswer;
