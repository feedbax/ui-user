import React from 'react';
import { Flex } from 'rebass';
import Dot from './Dot';

const boxStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
};

const dotStyles = {
  display: 'inline-block',
  background: '#fff',
  height: '12px',
  width: '12px',
  margin: '0 5px',
  borderRadius: '50%',
  transform: 'scale(0.7)'
};

const Dots = (): JSX.Element => (
  <Flex sx={boxStyles}>
    <Dot delay="0ms" sx={dotStyles} />
    <Dot delay="100ms" sx={dotStyles} />
    <Dot delay="200ms" sx={dotStyles} />
  </Flex>
);

export default Dots;
