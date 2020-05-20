import React from 'react';
import { useSelector } from 'react-redux';

import { PointerType } from 'store/types';
import { questionsLengthSelector } from 'store/selectors';
import { Control } from './styled';

import { QuestionChangeDir } from '../../types';
import type { MouseControlProps } from './types';

function MouseControl(props: MouseControlProps): JSX.Element {
  const questionsLength = useSelector(questionsLengthSelector);

  const { onQuestionChange, questionNumber } = props;
  const { pointerType } = props;

  const isMouse = pointerType === PointerType.MOUSE;
  const isFirstQuestion = questionNumber === 0;
  const isLastQuestion = questionNumber === questionsLength - 1;

  const _changeQuestion = (newQuestionNumber: number, dir: QuestionChangeDir): void => {
    const _min = Math.min(newQuestionNumber, questionsLength - 1);
    const _max = Math.max(0, _min);

    onQuestionChange(_max, dir);
  };

  return isMouse ? (
    <>
      {!isFirstQuestion && (
        <Control
          onClick={(): void => _changeQuestion(questionNumber - 1, QuestionChangeDir.LEFT)}
          type="left"
        />
      )}

      {!isLastQuestion && (
        <Control
          onClick={(): void => _changeQuestion(questionNumber + 1, QuestionChangeDir.RIGHT)}
          type="right"
        />
      )}
    </>
  ) : (
    <React.Fragment />
  );
}

export default React.memo(MouseControl);
