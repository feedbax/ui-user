import React, { ReactNode } from 'react';

import styled from 'styled-components';
import media from 'lib/media-queries';
import { color, fontFamily } from 'assets/theme';

import store from 'store';
import api from 'lib/api';
import { isAnswer } from '@feedbax/api/dist/store/answers/types';

import Button from 'components/ButtonNeumorphism';

type AnswerState = import('@feedbax/api/dist/store/answers/types').AnswerState;

interface Props {
  className?: string;
  children: AnswerState | ReactNode;
}

const mq = media('xs', 'sm', 'md');
const AnswerStyled = styled.div`
  margin: 15px;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  background-color: ${color('primary')};
  font-family: ${fontFamily('secondaryAccent')};

  display: flex;

  ${mq`
    font-size: ${[14, 15, 16]}px;
  `}

  &:nth-of-type(2) {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &.placeholder--loading {
    flex-wrap: wrap;
  }

  &.placeholder--loading .word {
    color: rgba(0, 0, 0, 0);
    background-color: ${color('accent1')};
    display: inline-block;
    margin: 2px;
    opacity: 0.2;
    border-radius: 5px;
    font-size: 12px;
    letter-spacing: 4px;
  }
`;

const AnswerText = styled.span`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AnswerLikesStyled = styled.span`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  padding-left: 8px;
`;

const LikesCount = styled.div`
  padding-right: 8px;
  min-width: 30px;
  text-align: right;

  ${mq`
    font-size: ${[12, 13, 14]}px;
  `}
`;

interface AnswerLikesProps {
  likes: number;
  hasLiked: boolean;
}

const AnswerLikes = (props: AnswerLikesProps): JSX.Element => {
  return (
    <AnswerLikesStyled>
      <LikesCount>{props.likes}</LikesCount>

      <Button
        size={28}
        icon={props.hasLiked ? 'heart-filled' : 'heart'}
        apperance={{ backgroundColor: 'primary', textColor: 'accent1' }}
      />
    </AnswerLikesStyled>
  );
};

function useLiked(answerLikes: string[]): [number, boolean] {
  const { api: apiStore } = store.getState();
  const { likes } = apiStore;

  for (let i = 0; i < answerLikes.length; i += 1) {
    const answerLike = answerLikes[i];
    const like = likes[answerLike];

    if (like.author === api.uuid) {
      return [answerLikes.length, true];
    }
  }

  return [answerLikes.length, false];
}

const _RealAnswer = ({ answer }: { answer: AnswerState }): JSX.Element => {
  const [likes, hasLiked] = useLiked(answer.likes);
  const props = { answer: { id: answer.id } };

  return (
    <AnswerStyled onClick={(): Promise<void> => api.toggleLike(props)}>
      <AnswerText>{answer.text}</AnswerText>
      <AnswerLikes likes={likes} hasLiked={hasLiked} />
    </AnswerStyled>
  );
};

const RealAnswer = React.memo(_RealAnswer);

const Answer = ({ children, className }: Props): JSX.Element => {
  if (isAnswer(children)) {
    return <RealAnswer answer={children} />;
  }

  return <AnswerStyled className={className}>{children}</AnswerStyled>;
};

export default React.memo(Answer);
