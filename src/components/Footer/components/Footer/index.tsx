import React from 'react';
import { StyledFooter } from './styled';

import type { Props } from './types';

const parentProps: Props = { $color: 'primary' };
export const FooterProps = React.createContext(parentProps);

const Footer = ({ children, $color }: Props): JSX.Element => (
  <StyledFooter>
    <FooterProps.Provider value={{ $color }}>{children}</FooterProps.Provider>
  </StyledFooter>
);

export default React.memo(Footer);
