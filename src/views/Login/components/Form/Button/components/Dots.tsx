import React from 'react';
import { Flex } from 'rebass';
import Dot from './Dot';

const boxStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const dotStyles = {
  display: 'inline-block',
  background: '#fff',
  height: [8, 10, 12],
  width: [8, 10, 12],
  margin: '0 5px',
  borderRadius: '50%',
  transform: 'scale(0.7)',
};

const Dots = (): JSX.Element => (
  <Flex sx={boxStyles}>
    <Dot delay="0ms" sx={dotStyles} />
    <Dot delay="100ms" sx={dotStyles} />
    <Dot delay="200ms" sx={dotStyles} />
  </Flex>
);

export default React.memo(Dots);
