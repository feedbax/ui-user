import React from 'react';
import Button from 'components/ButtonNeumorphism';
import { getScrollbarWidth } from 'lib/helper';

import type { PostAnswer } from './types';

const scrollBarWidth = getScrollbarWidth();

const PostAnswerButton: PostAnswer = (
  ({ onClick, answerText, isScrollable }) => (
    <Button
      icon="send"
      disabled={answerText.length === 0}
      onClick={onClick}
      size={35}
      apperance={{
        transform: `translate(-${isScrollable ? scrollBarWidth : 0}px, -50%)`,
        backgroundColor: 'accent1',
        position: 'absolute',
        top: [50, '%'],
        right: 15,
      }}
    />
  )
);

export default PostAnswerButton;
