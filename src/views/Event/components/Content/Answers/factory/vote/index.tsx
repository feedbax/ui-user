import React from 'react';

import api from 'lib/api';
import { replaceEmojis } from 'lib/helper';

import { isAnswer } from '@feedbax/backend-api/store/modules/answers/types';

import Button from 'components/ButtonNeumorphism';

import { AnswerStyled, AnswerText } from './styled';
import { AnswerLikesStyled, LikesCount } from './styled';

import type { AnswerLikesProps, Props } from './types';
import type { AnswerState } from '@feedbax/backend-api/store/modules/answers/types';

const AnswerLikes = (props: AnswerLikesProps): JSX.Element => {
  const toggleData = { answer: { id: props.answerId } };

  return (
    <AnswerLikesStyled>
      <LikesCount>{props.likes}</LikesCount>

      <Button
        onClick={(): Promise<any> => api.like.toggle(toggleData)}
        size={28}
        icon={props.hasLiked ? 'heart-filled' : 'heart'}
        apperance={{ backgroundColor: 'primary', textColor: 'accent1' }}
      />
    </AnswerLikesStyled>
  );
};

const $RealAnswer = (
  ({ answer }: { answer: AnswerState }): JSX.Element => (
    <AnswerStyled>
      <AnswerText ref={replaceEmojis}>{answer.text}</AnswerText>
      <AnswerLikes answerId={answer.id} likes={answer.likes} hasLiked={answer.hasLiked} />
    </AnswerStyled>
  )
);

const RealAnswer = React.memo($RealAnswer);

const Answer = ({ children, className }: Props): JSX.Element => {
  if (isAnswer(children)) {
    return <RealAnswer answer={children} />;
  }

  return <AnswerStyled className={className}>{children}</AnswerStyled>;
};

export default React.memo(Answer);
