import React from 'react';
import { useSelector } from 'react-redux';

import { currentQuestionSelector } from 'store/selectors';

import { QuestionType } from '@feedbax/backend-api/shared/models/question';
import PlaceholderLoading from '../components/PlaceholderLoading';

import AnswerVote from './vote';
import AnswerPoll from './poll';

import type { AnswerState } from '@feedbax/backend-api/store/modules/answers/types';

interface Props {
  answer: AnswerState;
}

export default function AnswerFactory({ answer }: Props): JSX.Element {
  const currentQuestion = useSelector(currentQuestionSelector);

  switch (currentQuestion.type) {
    case QuestionType.POLL:
      return <AnswerPoll>{answer}</AnswerPoll>;

    case QuestionType.VOTE:
      return <AnswerVote>{answer}</AnswerVote>;

    case QuestionType.NONE:
    default:
      return <>{PlaceholderLoading}</>;
  }
}
