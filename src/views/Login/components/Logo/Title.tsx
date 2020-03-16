import React from 'react';
import { Text } from 'rebass';

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}

const Title = ({ children }: Props): JSX.Element => (
  <Text
    sx={{
      fontFamily: 'secondary',
      fontWeight: 'bold',
      fontSize: [2, 3, 4],
      color: 'primary'
    }}
  >
    {children}
  </Text>
);

export default Title;
