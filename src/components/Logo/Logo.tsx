import React, { ReactNode } from 'react';

import { Flex, Box, BoxProps } from 'rebass';

export enum LogoSize {
  Small,
  Regular,
}

interface Props extends BoxProps {
  children?: ReactNode;
  size?: LogoSize;
}

const parentProps: Props = { size: LogoSize.Regular };
export const LogoProps = React.createContext(parentProps);

const Logo = ({ children, size = LogoSize.Regular, ...props }: Props): JSX.Element => (
  <Box {...props}>
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <LogoProps.Provider value={{ size }}>{children}</LogoProps.Provider>
    </Flex>
  </Box>
);

export default React.memo(Logo);
