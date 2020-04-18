import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const Box = styled.div`
  display: block;
  position: relative;
  max-width: 100%;
  width: 100%;
`;

const Form = ({ children }: Props): JSX.Element => <Box>{children}</Box>;

export default React.memo(Form);
