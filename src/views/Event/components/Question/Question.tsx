import React, { useState, useCallback } from 'react';

import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { useLocationEffect } from 'lib/hooks';

import styled from 'styled-components';
import { fontFamily, color } from 'assets/theme';
import media from 'lib/media-queries';

import Dragger from './components/Dragger';
import Placeholder from './components/Placeholder';

type ApiState = import('@feedbax/api/dist/store').ApiState;
type QuestionState = import('@feedbax/api/dist/store/questions/types').QuestionState;
type QuestionsState = import('@feedbax/api/dist/store/questions/types').QuestionsState;

type Question = Omit<QuestionState, 'answers' | 'likes'>;

interface Props {
  questionNumber: number;
  onQuestionChange: (newQuestionNumber: number) => void;
  onQuestionHeightChange: (newQuestionHeight: number) => void;
}

type StyledProps = {
  questionHeight: number;
};

const StyledWrapper = styled.div<StyledProps>`
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  font-family: ${fontFamily('secondary')};
  cursor: pointer;
  user-select: none;
  position: absolute;

  height: ${(props): number => props.questionHeight}px;
`;

const StyledQuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const mq = media('xs', 'sm', 'md');
const StyledQuestionNumber = styled.div`
  flex: 0 0 auto;
  position: relative;
  margin-right: 15px;

  font-family: ${fontFamily('primary')};
  font-weight: 700;

  border-bottom-color: ${color('accent1')};
  border-bottom-style: solid;

  ${mq`
    font-size: ${[32, 40, 46]}px;
    line-height: ${[21, 25, 28]}px;
    padding-bottom: ${[5.5, 7.5, 9]}px;
    border-bottom-width: ${[3, 3, 4]}px;
  `}
`;

const StyledQuestionText = styled.div`
  flex: 0 1 auto;

  ${mq`
    font-size: ${[18, 22, 25]}px;
    line-height: ${[21, 25, 28]}px;    
  `}
`;

const questionsSelector = createSelector<ApiState, QuestionsState, Question[]>(
  (_state) => _state.questions,
  (questions) =>
    Object.values(questions)
      .sort((a, b) => a.order - b.order)
      .map<Question>(({ answers: _a, likes: _l, ...rest }) => rest)
);

function Question({
  questionNumber,
  onQuestionChange,
  onQuestionHeightChange,
}: Props): JSX.Element {
  const [questionHeight, setQuestionHeight] = useState<number>(0);

  const questions = useSelector<ApiState, Question[]>(questionsSelector);
  const question = questions[questionNumber];

  const isEventLoaded = useSelector<ApiState, boolean>((_state) => _state.event.id !== '');
  const eventCode = useSelector<ApiState, string>((_state) => _state.event.slug);
  const [isReady, setReady] = useState(false);

  useLocationEffect(`/e/${eventCode}`, () => {
    setReady(isEventLoaded);

    console.log('Question', 'useLocationEffect');
    console.log('Question', 'isEventLoaded?', isEventLoaded);
  });

  const _getHeight = useCallback(
    (questionElement: HTMLDivElement | null): void => {
      if (questionElement) {
        const { height } = questionElement.getBoundingClientRect();
        setQuestionHeight(height);
        onQuestionHeightChange(height + 40);
        console.log('question', 'height', height);
      }
    },
    [onQuestionHeightChange]
  );

  return (
    <StyledWrapper questionHeight={questionHeight + 40}>
      {isReady ? (
        <Dragger
          onQuestionChange={onQuestionChange}
          question={question}
          questionNumber={questionNumber}
          questionsLength={questions.length}
        >
          <StyledQuestionWrapper ref={_getHeight}>
            <StyledQuestionNumber>{`${questionNumber + 1}`.padStart(2, '0')}</StyledQuestionNumber>
            <StyledQuestionText>{question?.text || ''}</StyledQuestionText>
          </StyledQuestionWrapper>
        </Dragger>
      ) : (
        <Placeholder ref={_getHeight} />
      )}
    </StyledWrapper>
  );
}

export default React.memo(Question);
