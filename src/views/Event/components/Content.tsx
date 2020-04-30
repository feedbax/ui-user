import React, { Ref, ReactNode } from 'react';
import styled from 'styled-components';
import { color } from 'assets/theme';

interface Props {
  children: ReactNode;
}

const StyledContent = styled.div`
  flex: 1 1 100%;
  overflow-y: scroll;
  position: relative;
  background-color: ${color('primary')};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = ({ children }: Props, ref: Ref<HTMLDivElement>): JSX.Element => (
  <StyledContent ref={ref} data-scroll-lock-scrollable>
    {children}
  </StyledContent>
);

export default React.forwardRef(Content);
