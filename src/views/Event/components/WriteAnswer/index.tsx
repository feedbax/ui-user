import React from 'react';
import { useSelector } from 'react-redux';
import { currentQuestionSelector } from 'store/selectors';
import { isWriteAble } from '@feedbax/backend-api/store/modules/questions/types';

import TextArea from './components/TextArea';
import PostAnswerButton from './components/PostAnswerButton';

import { StyledBox } from './styled';
import type { Props } from './types';


const WriteAnswer = ({ children }: Props): JSX.Element => {
  const currentQuestion = useSelector(currentQuestionSelector);

  if (isWriteAble(currentQuestion)) {
    return <StyledBox>{children}</StyledBox>;
  }

  return <React.Fragment />;
};


export default WriteAnswer;
export { TextArea, PostAnswerButton };
