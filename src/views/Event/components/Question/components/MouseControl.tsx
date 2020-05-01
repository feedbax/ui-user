import React from 'react';
import { useSelector } from 'react-redux';

import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import { PointerType } from 'store/types';
import { questionsLengthSelector } from 'store/selectors';

import { QuestionChangeDir } from '../Question';

interface MouseControlProps {
  onQuestionChange: (newQuestionNumber: number, direction: QuestionChangeDir) => void;
  questionNumber: number;
  pointerType: PointerType;
}

interface ControlProps {
  type: string;
}

const Control = styled.div<ControlProps>`
  position: absolute;
  width: 50%;
  height: 100%;
  z-index: 2;

  top: 0;

  font-family: feedbax-icons;
  vertical-align: baseline;
  font-weight: normal;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  ${({ type }): FlattenSimpleInterpolation => css`
    ${type === 'left' ? 'left: 0;' : ''}
    ${type === 'right' ? 'right: 0;' : ''}

    &::after {
      ${type === 'left' ? "content: '\\e804';" : ''}
      ${type === 'right' ? "content: '\\e805';" : ''}

      position: absolute;
      ${type === 'left' ? 'left: -15px;' : ''}
      ${type === 'right' ? 'right: -15px;' : ''}
    }
  `}
`;

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
    <></>
  );
}

export default React.memo(MouseControl);
