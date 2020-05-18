import React from 'react';
import { StyledText } from './styled';

import type { Props } from './types';

const Greeting = (
  ({ children }: Props): JSX.Element => (
    <StyledText>{children}</StyledText>
  )
);

export default React.memo(Greeting);
