import React from 'react';

import { Flex, Box } from 'rebass';

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}

const Logo = ({ children }: Props): JSX.Element => (
  <Box mb={[30, 40, 50]}>
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      {children}
    </Flex>
  </Box>
);

export default Logo;
