import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

import { NoneQuestion } from '@feedbax/api/dist/store/questions/types';
import { RootState } from 'store';

type ApiState = import('@feedbax/api/dist/store').ApiStateDefault;
type QuestionState = import('@feedbax/api/dist/store/questions/types').QuestionState;
type QuestionsState = import('@feedbax/api/dist/store/questions/types').QuestionsState;

type Question = Omit<QuestionState, 'answers' | 'likes' | 'text' | 'type' | 'settings'>;

type StripProps = ['answers', 'likes', 'text', 'type', 'settings'];
const stripProps: StripProps = ['answers', 'likes', 'text', 'type', 'settings'];

interface PaginationDotProps {
  active: boolean;
}

const PaginationDot = styled.div<PaginationDotProps>`
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 2px;

  transition: transform 0.3s ease, opacity 0.3s ease;

  ${(props): FlattenSimpleInterpolation => css`
    transform: scale(${props.active ? 1 : 0.6});
    opacity: ${props.active ? 1 : 0.6};
  `}
`;

const Wrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const questionsSelector = createSelector<ApiState, QuestionsState, Question[]>(
  (_state) => _state.api.questions,
  (questions) =>
    Object.values(questions)
      .sort((a, b) => a.order - b.order)
      .map<Question>((question) => {
        const newQuestion = { ...question };

        for (let i = 0; i < stripProps.length; i += 1) {
          const stripProp = stripProps[i];
          delete newQuestion[stripProp];
        }

        return newQuestion;
      })
);

function Pagination(): JSX.Element {
  const questions = useSelector<ApiState, Question[]>(questionsSelector);
  const currentQuestion = useSelector<RootState, Question>(
    (state) => state.app.currentQuestion || NoneQuestion
  );

  return (
    <Wrapper>
      {questions.map((question) => (
        <PaginationDot key={question.id} active={question.order === currentQuestion.order} />
      ))}
    </Wrapper>
  );
}

export default React.memo(Pagination);
