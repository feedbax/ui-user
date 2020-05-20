import type { PointerType } from 'store/types';
import type { QuestionChangeDir } from '../../types';

export interface MouseControlProps {
  onQuestionChange: (newQuestionNumber: number, direction: QuestionChangeDir) => void;
  questionNumber: number;
  pointerType: PointerType;
}

export interface ControlProps {
  type: string;
}
