import React, { ReactNode } from 'react';
import { SxStyleProp, Box } from 'rebass';

interface Props {
  children: ReactNode;
}

const styleWriteAnswer: SxStyleProp = {
  position: 'relative',
  flex: '1 0 auto',
  backgroundColor: 'accent1',
  overflow: 'hidden',
};

const WriteAnswer = ({ children }: Props): JSX.Element => (
  <Box sx={styleWriteAnswer}>{children}</Box>
);

export default WriteAnswer;
