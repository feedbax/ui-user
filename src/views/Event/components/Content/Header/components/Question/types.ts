import type { replaceEmojis } from 'lib/helper';
import type { PointerType } from 'store/types';

export enum QuestionChangeDir {
  LEFT = 1,
  RIGHT = -1,
}

export const cache = {
  dir: QuestionChangeDir.RIGHT,
};

export type QuestionTextProps = {
  ref: typeof replaceEmojis;
};

export type QuestionWrapperProps = {
  pointerType: PointerType;
};

export type WrapperProps = {
  questionHeight: number;
};
