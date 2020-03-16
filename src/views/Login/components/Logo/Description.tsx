import React from 'react';
import { Text } from 'rebass';

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}

const Description = ({ children }: Props): JSX.Element => (
  <Text sx={{ fontFamily: 'secondary', fontSize: [0, 1, 2], color: 'primary' }}>{children}</Text>
);

export default Description;
