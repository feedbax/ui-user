import React, { useState, useCallback } from 'react';

import { useSelector } from 'react-redux';
import { useLocationEffect, useEmojis as _useEmojis, resizeQuestion } from 'lib/hooks';

import store, { RootState } from 'store';
import { setCurrentQuestion, setSeletedAnswer } from 'store/actions';
import { PointerType } from 'store/types';

import {
  currentQuestionSelector,
  pointerTypeSelector,
  isEventLoadedSelector,
  eventCodeSelector,
} from 'store/selectors';

import Dragger from './components/Dragger';
import Placeholder from './components/Placeholder';

import StyledWrapper from './components/StyledWrapper';
import StyledQuestionWrapper from './components/StyledQuestionWrapper';
import StyledQuestionNumber from './components/StyledQuestionNumber';
import StyledQuestionText from './components/StyledQuestionText';
import MouseControl from './components/MouseControl';

type QuestionState = import('@feedbax/api/store/questions/types').QuestionState;
type Question = Omit<QuestionState, 'answers' | 'likes'>;

export enum QuestionChangeDir {
  LEFT = 1,
  RIGHT = -1,
}

export const cache = {
  dir: QuestionChangeDir.RIGHT,
};

const refEffect = (el: HTMLElement): void => {
  _useEmojis(el);
  resizeQuestion(el);
};

function Question(): JSX.Element {
  const [questionHeight, setQuestionHeight] = useState(0);
  const [isReady, setReady] = useState(false);

  const currentQuestion = useSelector(currentQuestionSelector);
  const pointerType = useSelector<RootState, PointerType>(pointerTypeSelector);

  const isEventLoaded = useSelector(isEventLoadedSelector);
  const eventCode = useSelector(eventCodeSelector);

  useLocationEffect(`/e/${eventCode}`, () => {
    setReady(isEventLoaded);

    if (isEventLoaded) {
      const action = setCurrentQuestion(0);
      store.dispatch(action);
    }

    // console.log('Question', 'useLocationEffect');
    // console.log('Question', 'isEventLoaded?', isEventLoaded);
  });

  const _onQuestionChange = useCallback((newQuestion: number, dir: QuestionChangeDir): void => {
    cache.dir = dir;

    const actions = [setCurrentQuestion(newQuestion), setSeletedAnswer(null)];
    store.dispatchAll(...actions);
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
          <StyledQuestionWrapper pointerType={pointerType} ref={_getHeight}>
            <MouseControl
              pointerType={pointerType}
              questionNumber={currentQuestion?.order || 0}
              onQuestionChange={_onQuestionChange}
            />

            <StyledQuestionNumber>
              {`${(currentQuestion?.order || 0) + 1}`.padStart(2, '0')}
            </StyledQuestionNumber>
            <StyledQuestionText ref={refEffect}>{currentQuestion?.text || ''}</StyledQuestionText>
          </StyledQuestionWrapper>
        </Dragger>
      ) : (
        <Placeholder ref={_getHeight} />
      )}
    </StyledWrapper>
  );
}

export default React.memo(Question);
