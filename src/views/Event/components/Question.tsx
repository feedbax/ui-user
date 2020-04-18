import React, { useState, useCallback } from 'react';

import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useLocationEffect } from 'lib/hooks';
import styled from 'styled-components';
import { fontFamily, color } from 'assets/theme';
import media from 'lib/media-queries';

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
  height: number;
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

  height: ${(props): number => props.height}px;
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
  text-align: justify;

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
  const [direction, setDirection] = useState<number>(-1);
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

  const _getHeight = (questionElement: HTMLDivElement | null): void => {
    if (questionElement) {
      const { height } = questionElement.getBoundingClientRect();
      setQuestionHeight(height);
      onQuestionHeightChange(height + 40);
      console.log('question', 'height', height);
    }
  };

  const _onDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
      if (info.point.x >= 10) {
        setDirection(1);
        onQuestionChange(Math.max(questionNumber - 1, 0));
      }

      if (info.point.x <= -10) {
        setDirection(-1);
        onQuestionChange(Math.min(questionNumber + 1, questions.length - 1));
      }
    },
    [onQuestionChange, questionNumber, questions.length]
  );

  const _content = (
    <>
      <motion.div
        key={`overlay-${question?.id}`}
        initial={{ display: 'block' }}
        animate={{ display: 'inherit', transitionEnd: { display: 'none' } }}
        exit={{ display: 'block' }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          zIndex: 2,
        }}
      />
      <AnimatePresence initial={false}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={_onDragEnd}
          style={{
            position: 'absolute',
            padding: '20px 30px',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
          }}
          key={question?.id}
          initial={{ x: `${direction * -100}%` }}
          animate={{ x: 0 }}
          exit={{ x: `${direction * 100}%`, zIndex: 1 }}
          transition={{ duration: 0.3 }}
        >
          <StyledQuestionWrapper ref={_getHeight}>
            <StyledQuestionNumber>{`${questionNumber + 1}`.padStart(2, '0')}</StyledQuestionNumber>
            <StyledQuestionText>{question?.text || ''}</StyledQuestionText>
          </StyledQuestionWrapper>
        </motion.div>
      </AnimatePresence>
    </>
  );

  return <StyledWrapper height={questionHeight + 40}> {isReady ? _content : ''}</StyledWrapper>;
}

export default React.memo(Question);
