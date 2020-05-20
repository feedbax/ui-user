import React, { Ref, ReactNode } from 'react';
import styled from 'styled-components';
import { color } from 'assets/styles/theme';

import Pagination from './components/Pagination';
import Question from './components/Question';
import AnswerFilter from './components/AnswerFilter';
import LogoutButton from './components/LogoutButton';
import ShareButton from './components/ShareButton';

interface Props {
  children: ReactNode;
}

const StyledContent = styled.div`
  flex: 0 0 auto;
  position: relative;
  background-color: ${color('accent2')};
  display: flex;
  flex-direction: column;
`;

const Content = ({ children }: Props, ref: Ref<HTMLDivElement>): JSX.Element => (
  <StyledContent ref={ref} data-scroll-lock-scrollable>
    {children}
  </StyledContent>
);

export default React.forwardRef(Content);

export {
  Pagination,
  Question,
  AnswerFilter,
  LogoutButton,
  ShareButton,
};
