import React, { useState, useCallback } from 'react';

import { useSelector } from 'react-redux';
import { useLocationEffect } from 'lib/hooks';
import { replaceEmojis, forceLineBreak } from 'lib/helper';

import store, { RootState } from 'store';
import { setCurrentQuestion, setSeletedAnswer } from 'store/actions';
import { PointerType } from 'store/types';

import {
  currentQuestionSelector,
  pointerTypeSelector,
  isEventLoadedSelector,
  eventCodeSelector,
} from 'store/selectors';

import Placeholder from './components/Placeholder';
import MouseControl from './components/MouseControl';
import Dragger from './components/Dragger';

import { Wrapper, QuestionWrapper } from './styled';
import { QuestionText, QuestionNumber } from './styled';

import { cache, QuestionChangeDir } from './types';

const refEffect = (el: HTMLElement): void => {
  replaceEmojis(el);
  forceLineBreak(el);
};

function Question(): JSX.Element {
  const [questionHeight, setQuestionHeight] = useState(0);
  const [isReady, setReady] = useState(false);

  const currentQuestion = useSelector(currentQuestionSelector);
  const pointerType = useSelector<RootState, PointerType>(pointerTypeSelector);

  const isEventLoaded = useSelector(isEventLoadedSelector);
  const eventCode = useSelector(eventCodeSelector);

  const questionNumber = `${(currentQuestion?.order || 0) + 1}`.padStart(2, '0');
  const questionText = currentQuestion?.text || '';

  useLocationEffect(`/e/${eventCode}`, () => {
    setReady(isEventLoaded);

    if (isEventLoaded) {
      const action = setCurrentQuestion(0);
      store.dispatch(action);
    }
  });

  const $onQuestionChange = useCallback((newQuestion: number, dir: QuestionChangeDir): void => {
    cache.dir = dir;

    const actions = [setCurrentQuestion(newQuestion), setSeletedAnswer(null)];
    store.dispatchAll(...actions);
  }, []);

  const $getHeight = useCallback((questionElement: HTMLDivElement | null): void => {
    if (questionElement) {
      const { height } = questionElement.getBoundingClientRect();
      setQuestionHeight(height);
    }
  }, []);

  return (
    <Wrapper questionHeight={questionHeight + 20}>
      {isReady ? (
        <Dragger onQuestionChange={$onQuestionChange} question={currentQuestion}>
          <QuestionWrapper pointerType={pointerType} ref={$getHeight}>
            <MouseControl
              pointerType={pointerType}
              questionNumber={currentQuestion?.order || 0}
              onQuestionChange={$onQuestionChange}
            />

            <QuestionNumber>{ questionNumber }</QuestionNumber>
            <QuestionText ref={refEffect}>{ questionText }</QuestionText>
          </QuestionWrapper>
        </Dragger>
      ) : (
        <Placeholder ref={$getHeight} />
      )}
    </Wrapper>
  );
}

export default React.memo(Question);
