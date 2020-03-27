import React, { ReactNode } from 'react';
import { Text as RebassText, TextProps } from 'rebass';

interface Props extends TextProps {
  children: ReactNode;
}

const Text = ({ children, ...props }: Props): JSX.Element => (
  <RebassText {...props} sx={{ fontFamily: 'secondaryAccent', fontSize: 1 }}>
    {children}
  </RebassText>
);

export default React.memo(Text);
