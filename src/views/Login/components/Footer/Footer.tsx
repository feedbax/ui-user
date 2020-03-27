import React, { ReactNode } from 'react';
import { Flex } from 'rebass';

interface Props {
  children: ReactNode;
}

const Footer = ({ children }: Props): JSX.Element => (
  <Flex flexDirection="column" justifyContent="center" alignItems="center">
    {children}
  </Flex>
);

export default React.memo(Footer);
