import React from 'react';
import { useSelector } from 'react-redux';
import { currentQuestionSelector, selectedAnswerSelector } from 'store/selectors';
import { isVoteAble } from '@feedbax/backend-api/store/modules/questions/types';

import Button from './components/Button';
import { StyledBox } from './styled';

import type { Props } from './types';

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
export { Button };
