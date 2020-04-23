import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { color } from 'assets/theme';

import { Question, AnswerFilter } from 'store/types';
import { RootState } from 'store';
import { NoneQuestion } from '@feedbax/api/dist/store/questions/types';

import { useLocationEffect } from 'lib/hooks';
import { answersSelector } from './selector';

import Answer from './components/Answer';
import PlaceholderEmpty from './components/PlaceholderEmpty';
import PlaceholderLoading from './components/PlaceholderLoading';

type ApiState = import('@feedbax/api/dist/store').ApiStateDefault;
type AnswerState = import('@feedbax/api/dist/store/answers/types').AnswerState;

const renderAnswer = (answer: AnswerState): JSX.Element => (
  <Answer key={answer.id}>{answer.text}</Answer>
);

const Wrapper = styled.div`
  background-color: #fff;
  flex: 0 1 auto;

  & ${Answer}:nth-of-type(2) {
    margin-top: 0;
  }

  & ${Answer}:last-of-type {
    margin-bottom: 0;
  }
`;

const Underlay = styled.div`
  width: 100%;
  height: 25px;
  background-color: ${color('accent2')};
  position: absolute;
  z-index: 0;
`;

function Answers(): JSX.Element {
  const answerFilter = useSelector<RootState, AnswerFilter>((state) => state.app.answerFilter);
  const currentQuestion = useSelector<RootState, Question>(
    (state) => state.app.currentQuestion || NoneQuestion
  );

  const selector = answersSelector(currentQuestion.order, answerFilter);
  const answers = useSelector<ApiState, AnswerState[]>(selector);

  const isEventLoaded = useSelector<ApiState, boolean>((_state) => _state.api.event.id !== '');
  const eventCode = useSelector<ApiState, string>((_state) => _state.api.event.slug);
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
