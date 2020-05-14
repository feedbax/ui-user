import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { color } from 'assets/theme';

import { useLocationEffect } from 'lib/hooks';

import {
  currentAnswerFilterSelector,
  currentQuestionSelector,
  isEventLoadedSelector,
  eventCodeSelector,
} from 'store/selectors';

import { answersSelector } from './selector';

import AnswerFactory from './factory';
import PlaceholderEmpty from './components/PlaceholderEmpty';
import PlaceholderLoading from './components/PlaceholderLoading';

type ApiState = import('@feedbax/backend-api/store').ApiStateDefault;
type AnswerState = import('@feedbax/backend-api/store/modules/answers/types').AnswerState;

const renderAnswer = (answer: AnswerState): JSX.Element => (
  <AnswerFactory key={answer.id} answer={answer} />
);

const Wrapper = styled.div`
  background-color: #fff;
  flex: 0 0 auto;
  color: ${color('accent1')};
`;

const Underlay = styled.div`
  width: 100%;
  height: 25px;
  background-color: ${color('accent2')};
  position: absolute;
  z-index: 0;
`;

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
    [answers]
  );

  return (
    <Wrapper>
      <Underlay />
      {isReady ? _answersRenderer : PlaceholderLoading}
    </Wrapper>
  );
}

export default React.memo(Answers);
