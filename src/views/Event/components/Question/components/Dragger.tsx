import React, { useCallback, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { motion, AnimatePresence, PanInfo, Variants } from 'framer-motion';

import { questionsLengthSelector, pointerTypeSelector } from 'store/selectors';
import { PointerType } from 'store/types';

import { QuestionChangeDir, cache } from '../Question';

type QuestionState = import('@feedbax/api/dist/store/questions/types').QuestionState;
type Question = Omit<QuestionState, 'answers' | 'likes'>;

interface Props {
  children: ReactNode;
  question: Question;
  onQuestionChange: (newQuestionNumber: number, direction: QuestionChangeDir) => void;
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
  outInitial: (getDir) => ({ x: `${getDir() * -100}%` }),
  in: { x: 0 },
  outExit: (getDir) => ({ x: `${getDir() * 100}%`, zIndex: 1 }),
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
type QuestionProps = { children: ReactNode; onDragEnd: OnDragEnd; pointerType: PointerType };
const Question = ({ children, onDragEnd, pointerType }: QuestionProps): JSX.Element => (
  <motion.div
    drag={pointerType === PointerType.TOUCH ? 'x' : undefined}
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.2}
    onDragEnd={onDragEnd}
    variants={variantsQuestion}
    custom={(): number => cache.dir}
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

  const pointerType = useSelector(pointerTypeSelector);
  const questionsLength = useSelector(questionsLengthSelector);

  const _onDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
      if (info.point.x >= 10) {
        const newQuestionNumber = Math.max(question.order - 1, 0);
        onQuestionChange(newQuestionNumber, QuestionChangeDir.LEFT);
      }

      if (info.point.x <= -10) {
        const newQuestionNumber = Math.min(question.order + 1, questionsLength - 1);
        onQuestionChange(newQuestionNumber, QuestionChangeDir.RIGHT);
      }
    },
    [onQuestionChange, question.order, questionsLength]
  );

  return (
    <>
      <Overlay _key={`overlay-${question?.id}`} />
      <AnimatePresence initial={false}>
        <Question key={question?.id} pointerType={pointerType} onDragEnd={_onDragEnd}>
          {children}
        </Question>
      </AnimatePresence>
    </>
  );
}

export default React.memo(Dragger);
