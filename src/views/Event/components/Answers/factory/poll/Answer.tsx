import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import media from 'lib/media-queries';
import { color, fontFamily } from 'assets/theme';

import store from 'store';
import { questionLikesSelector } from 'store/selectors';

import api from 'lib/api';

type AnswerState = import('@feedbax/api/dist/store/answers/types').AnswerState;

interface Props {
  className?: string;
  children: AnswerState;
}

const mq = media('xs', 'sm', 'md');
const AnswerStyled = styled.div`
  margin: 0 15px;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  background-color: ${color('primary')};
  font-family: ${fontFamily('secondaryAccent')};

  display: flex;

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    left: 15px;
    bottom: 0;
    width: -webkit-calc(100% - 30px);
    width: -moz-calc(100% - 30px);
    width: calc(100% - 30px);
    height: 1px;
    background-color: #3a556a;
  }

  ${mq`
    font-size: ${[14, 15, 16]}px;
  `}
`;

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

const Answer = ({ children: answer, className }: Props): JSX.Element => {
  const likesQuestion = useSelector(questionLikesSelector);

  const [likes, hasLiked] = useLiked(answer.likes);
  const props = { answer: { id: answer.id } };

  console.log(likesQuestion, likes, hasLiked);

  return (
    <AnswerStyled className={className} onClick={(): Promise<void> => api.toggleLike(props)}>
      {answer.text}
    </AnswerStyled>
  );
};

export default React.memo(Answer);
