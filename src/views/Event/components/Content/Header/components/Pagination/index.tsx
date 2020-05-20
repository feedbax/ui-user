import React from 'react';
import { useSelector } from 'react-redux';
import { currentQuestionSelector, createQuestionsSelector } from 'store/selectors';
import { Wrapper, PaginationDot } from './styled';

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
