import React, { ReactNode } from 'react';
import { Flex, SxStyleProp } from 'rebass';

interface Props {
  children: ReactNode;
  bgProtrait: string;
  bgLandscape: string;
}

const styleFlexWrapper: SxStyleProp = {
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'auto',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const styleFlexContent: SxStyleProp = {
  flexDirection: 'column',
  flex: '1 1 auto',
  maxWidth: '540px',
  height: '100%',
  maxHeight: '100%',
  color: 'accent1',
  '@media (min-width: 540px)': {
    maxHeight: '800px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 20px 0px rgba(0, 0, 0, 0.5)',
  },
};

const Container = ({ children, bgProtrait, bgLandscape }: Props): JSX.Element => (
  <Flex
    sx={{
      ...styleFlexWrapper,
      '@media (orientation: portrait)': {
        backgroundImage: `url(${bgProtrait})`,
      },
      '@media (orientation: landscape)': {
        backgroundImage: `url(${bgLandscape})`,
      },
    }}
  >
    <Flex sx={styleFlexContent}>{children}</Flex>
  </Flex>
);

export default React.memo(Container);
