import type { ReactNode } from 'react';
import type { AnswerState } from '@feedbax/backend-api/store/modules/answers/types';
import type { replaceEmojis } from 'lib/helper';

export interface Props {
  className?: string;
  children: AnswerState | ReactNode;
}

export interface AnswerTextProps {
  ref?: typeof replaceEmojis;
}

export interface AnswerLikesProps {
  likes: number;
  hasLiked: boolean;
  answerId: string;
}
