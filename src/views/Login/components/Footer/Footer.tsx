import React from 'react';
import { Flex } from 'rebass';

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}

const Footer = ({ children }: Props): JSX.Element => (
  <Flex flexDirection="column" justifyContent="center" alignItems="center">
    {children}
  </Flex>
);

export default Footer;
