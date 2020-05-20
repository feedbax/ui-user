import type { replaceEmojis } from 'lib/helper';
import type { OpaqueInterpolation } from 'react-spring';
import type { AnswerState } from '@feedbax/backend-api/store/modules/answers/types';


export interface Props {
  className?: string;
  children: AnswerState;
}

export interface AnswerTextProps {
  hasLiked: boolean;
  ref?: typeof replaceEmojis;
}

export interface PercentageProps {
  percent: OpaqueInterpolation<number>;
  className?: string;
  hasLiked: boolean;
}
