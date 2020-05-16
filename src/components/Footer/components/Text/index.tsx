import React, { useContext } from 'react';
import { FooterProps } from '../Footer';
import { StyledText } from './styled';

import type { Props } from './types';

const Text = ({ children }: Props): JSX.Element => {
  const { $color: _color } = useContext(FooterProps);
  return <StyledText textColor={_color}>{children}</StyledText>;
};

export default React.memo(Text);
