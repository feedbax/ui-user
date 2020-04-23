import React, { useState, useCallback, ReactNode } from 'react';

import { motion, AnimatePresence, PanInfo, Variants } from 'framer-motion';
import { useSelector } from 'react-redux';

type ApiState = import('@feedbax/api/dist/store').ApiStateDefault;
type QuestionState = import('@feedbax/api/dist/store/questions/types').QuestionState;
type Question = Omit<QuestionState, 'answers' | 'likes'>;

interface Props {
  children: ReactNode;
  question: Question;
  onQuestionChange: (newQuestionNumber: number) => void;
}

const variantsOverlay: Variants = {
  lock: {
    display: 'block',
  },

  unlock: {
    display: 'inherit',
    transitionEnd: { display: 'none' },
  },
};

const variantsQuestion: Variants = {
  outInitial: (dir) => ({ x: `${dir * -100}%` }),
  in: { x: 0 },
  outExit: (dir) => ({ x: `${dir * 100}%`, zIndex: 1 }),
};

type OverlayProps = { _key: string };
const Overlay = ({ _key }: OverlayProps): JSX.Element => (
  <motion.div
    key={_key}
    variants={variantsOverlay}
    initial="lock"
    animate="unlock"
    exit="lock"
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
);

type OnDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
type QuestionProps = { _key: string; children: ReactNode; direction: number; onDragEnd: OnDragEnd };
const Question = ({ _key, children, direction, onDragEnd }: QuestionProps): JSX.Element => (
  <motion.div
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.2}
    onDragEnd={onDragEnd}
    variants={variantsQuestion}
    custom={direction}
    key={_key}
    initial="outInitial"
    animate="in"
    exit="outExit"
    transition={{ duration: 0.3 }}
    style={{
      position: 'absolute',
      padding: '20px 30px',
      paddingBottom: '0',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </motion.div>
);

function Dragger(props: Props): JSX.Element {
  const { question } = props;
  const { onQuestionChange } = props;
  const { children } = props;

  const [direction, setDirection] = useState<number>(-1);
  const questionsLength = useSelector<ApiState, number>(
    (state) => state.api.event.questions.length
  );

  const _onDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
      if (info.point.x >= 10) {
        setDirection(1);
        onQuestionChange(Math.max(question.order - 1, 0));
      }

      if (info.point.x <= -10) {
        setDirection(-1);
        onQuestionChange(Math.min(question.order + 1, questionsLength - 1));
      }
    },
    [onQuestionChange, question.order, questionsLength]
  );

  return (
    <>
      <Overlay _key={`overlay-${question?.id}`} />
      <AnimatePresence initial={false}>
        <Question _key={question.id} direction={direction} onDragEnd={_onDragEnd}>
          {children}
        </Question>
      </AnimatePresence>
    </>
  );
}

export default React.memo(Dragger);
