import React, { useState, useCallback } from 'react';

import { useSelector } from 'react-redux';
import { useLocationEffect } from 'lib/hooks';

import styled from 'styled-components';
import { fontFamily, color } from 'assets/theme';
import media from 'lib/media-queries';

import store, { RootState } from 'store';
import { setCurrentQuestion } from 'store/actions';
import { NoneQuestion } from '@feedbax/api/dist/store/questions/types';

import Dragger from './components/Dragger';
import Placeholder from './components/Placeholder';

type ApiState = import('@feedbax/api/dist/store').ApiStateDefault;
type QuestionState = import('@feedbax/api/dist/store/questions/types').QuestionState;
type Question = Omit<QuestionState, 'answers' | 'likes'>;

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
  position: relative;

  flex: 0 0 ${(props): number => props.questionHeight}px;
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

function Question(): JSX.Element {
  const [questionHeight, setQuestionHeight] = useState<number>(0);

  const currentQuestion = useSelector<RootState, Question>(
    (state) => state.app.currentQuestion || NoneQuestion
  );

  const isEventLoaded = useSelector<ApiState, boolean>((_state) => _state.api.event.id !== '');
  const eventCode = useSelector<ApiState, string>((_state) => _state.api.event.slug);
  const [isReady, setReady] = useState(false);

  useLocationEffect(`/e/${eventCode}`, () => {
    setReady(isEventLoaded);

    if (isEventLoaded) {
      const action = setCurrentQuestion(0);
      store.dispatch(action);
    }

    // console.log('Question', 'useLocationEffect');
    // console.log('Question', 'isEventLoaded?', isEventLoaded);
  });

  const _onQuestionChange = useCallback((newQuestion: number): void => {
    const action = setCurrentQuestion(newQuestion);
    store.dispatch(action);
  }, []);

  const _getHeight = useCallback((questionElement: HTMLDivElement | null): void => {
    if (questionElement) {
      const { height } = questionElement.getBoundingClientRect();
      setQuestionHeight(height);
      // console.log('question', 'height', height);
    }
  }, []);

  return (
    <StyledWrapper questionHeight={questionHeight + 20}>
      {isReady ? (
        <Dragger onQuestionChange={_onQuestionChange} question={currentQuestion}>
          <StyledQuestionWrapper ref={_getHeight}>
            <StyledQuestionNumber>
              {`${(currentQuestion?.order || 0) + 1}`.padStart(2, '0')}
            </StyledQuestionNumber>
            <StyledQuestionText>{currentQuestion?.text || ''}</StyledQuestionText>
          </StyledQuestionWrapper>
        </Dragger>
      ) : (
        <Placeholder ref={_getHeight} />
      )}
    </StyledWrapper>
  );
}

export default React.memo(Question);
