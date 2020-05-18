import React from 'react';

import Footer from './components/Footer';
import Divider from './components/Divider';
import Text from './components/Text';
import Link from './components/Link';

import type { Props } from './components/Footer/types';

export default Footer;

export {
  Divider,
  Text,
  Link,
};

export const FBXFooter = (
  (props: Props): JSX.Element => (
    <Footer {...props}>
      <Divider />
      <Text>{`© 2019-${new Date().getFullYear()} | feedb.ax by 365steps`}</Text>
      <Link to="/legal/privacy-policy">{'Datenschutz & Impressum'}</Link>
    </Footer>
  )
);
