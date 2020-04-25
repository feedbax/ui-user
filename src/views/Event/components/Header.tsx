import React, { Ref, ReactNode } from 'react';
import styled from 'styled-components';
import { color } from 'assets/theme';

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
