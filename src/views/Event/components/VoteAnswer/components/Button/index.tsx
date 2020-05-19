import React from 'react';
import { StyledButton } from './styled';

import type { Props } from './types';

export default function Button({ children, onClick }: Props): JSX.Element {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
