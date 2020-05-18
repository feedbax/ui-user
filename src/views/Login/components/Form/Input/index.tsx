import React from 'react';
import { StyledInput } from './styled';

import type { Props } from './types';


const Input = (
  ({ children: placeholder, ...props }: Props): JSX.Element => (
    <StyledInput {...props} placeholder={placeholder} />
  )
);

export default React.memo(Input);
