import React from 'react';

import { LogoSize } from './types';
import { StyledContainer, StyledLink } from './styled';

import type { Props } from './types';

const parentProps: Props = { size: LogoSize.Regular };
export const LogoProps = React.createContext(parentProps);

const Logo = (props: Props): JSX.Element => {
  const { children, ...$props1 } = props;
  const { link, size = LogoSize.Regular, ...$props2 } = $props1;

  return (
    <StyledContainer {...$props2}>
      <LogoProps.Provider value={{ size }}>
        {link ? <StyledLink to={link}>{children}</StyledLink> : children}
      </LogoProps.Provider>
    </StyledContainer>
  );
};

export default Logo;

export * from './types';
