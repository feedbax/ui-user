import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { useSelector } from 'react-redux';

import { currentQuestionSelector, createQuestionsSelector } from 'store/selectors';

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

const questionsSelector = createQuestionsSelector('answers', 'likes', 'text', 'type', 'settings');

function Pagination(): JSX.Element {
  const questions = useSelector(questionsSelector);
  const currentQuestion = useSelector(currentQuestionSelector);

  return (
    <Wrapper>
      {questions.map((question) => (
        <PaginationDot key={question.id} active={question.order === currentQuestion.order} />
      ))}
    </Wrapper>
  );
}

export default React.memo(Pagination);
