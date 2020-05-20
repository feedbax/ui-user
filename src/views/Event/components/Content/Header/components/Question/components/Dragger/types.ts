import type { ReactNode } from 'react';
import type { PanInfo } from 'framer-motion';
import type { PointerType } from 'store/types';
import type { QuestionState } from '@feedbax/backend-api/store/modules/questions/types';
import type { QuestionChangeDir } from '../../types';

type Question = Omit<QuestionState, 'answers' | 'likes'>;

export interface Props {
  children: ReactNode;
  question: Question;
  onQuestionChange: (newQuestionNumber: number, direction: QuestionChangeDir) => void;
}

export type OverlayProps = { _key: string };

export type OnDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
export type QuestionProps = { children: ReactNode; onDragEnd: OnDragEnd; pointerType: PointerType };
