import React, { ReactNode } from 'react';
import { Flex, Box } from 'rebass';

interface Props {
  children: ReactNode;
  bgProtrait: string;
  bgLandscape: string;
}

const Container = ({ children, bgProtrait, bgLandscape }: Props): JSX.Element => (
  <Flex
    size="100%"
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    overflow="auto"
    sx={{
      '@media (orientation: portrait)': {
        backgroundImage: `url(${bgProtrait})`,
      },
      '@media (orientation: landscape)': {
        backgroundImage: `url(${bgLandscape})`,
      },
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <Box flex="1 1 auto" m="auto" p={3} maxWidth={[380, 440, 500]} color="primary">
      {children}
    </Box>
  </Flex>
);

export default React.memo(Container);
