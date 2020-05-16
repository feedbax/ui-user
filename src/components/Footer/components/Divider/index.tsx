import React, { useContext } from 'react';
import { FooterProps } from '../Footer';
import { StyledDivider } from './styled';

const Divider = (): JSX.Element => {
  const { $color: borderColor } = useContext(FooterProps);
  return <StyledDivider borderColor={borderColor} />;
};

export default React.memo(Divider);
