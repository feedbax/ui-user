import React from 'react';
import { Text } from 'rebass';

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}

const Greeting = ({ children }: Props): JSX.Element => (
  <Text
    sx={{
      color: 'primary',
      fontFamily: 'secondary',
      fontWeight: 'bold',
      fontSize: [82, 92, 102],
      textAlign: 'center'
    }}
  >
    {children}
  </Text>
);

export default Greeting;
