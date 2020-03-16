import React from 'react';
import { Box } from 'rebass';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Form = ({ children }: Props): JSX.Element => <Box>{children}</Box>;

export default Form;
