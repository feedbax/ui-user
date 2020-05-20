import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useLocationEffect } from 'lib/hooks';

import {
  currentAnswerFilterSelector,
  currentQuestionSelector,
  isEventLoadedSelector,
  eventCodeSelector,
} from 'store/selectors';

import { answersSelector } from './selector';

import AnswerFactory from './factory';
import { Underlay, Wrapper } from './styled';

import PlaceholderEmpty from './components/PlaceholderEmpty';
import PlaceholderLoading from './components/PlaceholderLoading';

import type { ApiStateDefault as ApiState } from '@feedbax/backend-api/store';
import type { AnswerState } from '@feedbax/backend-api/store/modules/answers/types';

const renderAnswer = (answer: AnswerState): JSX.Element => (
  <AnswerFactory key={answer.id} answer={answer} />
);

function Answers(): JSX.Element {
  const answerFilter = useSelector(currentAnswerFilterSelector);
  const currentQuestion = useSelector(currentQuestionSelector);

  const selector = answersSelector(currentQuestion.order, answerFilter);
  const answers = useSelector<ApiState, AnswerState[]>(selector);

  const isEventLoaded = useSelector(isEventLoadedSelector);
  const eventCode = useSelector(eventCodeSelector);

  const [isReady, setReady] = useState(false);

  useLocationEffect(`/e/${eventCode}`, () => {
    setReady(isEventLoaded);
  });

  const _answersRenderer = useMemo(
    () => (answers.length === 0 ? PlaceholderEmpty : answers.map(renderAnswer)),
    [answers],
  );

  return (
    <Wrapper>
      <Underlay />
      {isReady ? _answersRenderer : PlaceholderLoading}
    </Wrapper>
  );
}

export default React.memo(Answers);
