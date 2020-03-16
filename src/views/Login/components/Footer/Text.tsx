import React from 'react';
import { Text as RebassText, TextProps } from 'rebass';

interface Props extends TextProps {
  children: JSX.Element | JSX.Element[] | string;
}

const Text = ({ children, ...props }: Props): JSX.Element => (
  <RebassText {...props} sx={{ fontFamily: 'secondaryAccent', fontSize: 1 }}>
    {children}
  </RebassText>
);

export default Text;
