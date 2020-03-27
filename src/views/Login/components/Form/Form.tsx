import React, { ReactNode } from 'react';
import { Box } from 'rebass';

interface Props {
  children: ReactNode;
}

const Form = ({ children }: Props): JSX.Element => <Box>{children}</Box>;

export default React.memo(Form);
