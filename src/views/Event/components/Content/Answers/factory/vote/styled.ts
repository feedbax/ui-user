import styled from 'styled-components';

import {
  answerStyle,
  answerTextStyle,
  answerLikesStyle,
  likesCountStyle,
} from './styles';

export const AnswerStyled = styled.div`
  ${answerStyle}
`;

export const AnswerText = styled.span`
  ${answerTextStyle}
`;

export const AnswerLikesStyled = styled.span`
  ${answerLikesStyle}
`;

export const LikesCount = styled.div`
  ${likesCountStyle}
`;
