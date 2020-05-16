import React, { useContext } from 'react';
import { FooterProps } from '../Footer';
import { StyledLink } from './styled';

import type { Props } from './types';

const Link = ({ children, to }: Props): JSX.Element => {
  const { $color: _color } = useContext(FooterProps);

  return (
    <StyledLink to={to} textColor={_color}>
      {children}
    </StyledLink>
  );
};

export default React.memo(Link);
