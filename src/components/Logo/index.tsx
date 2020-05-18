import React from 'react';

import Logo, { LogoSize } from './components/Logo';
import Image from './components/Image';
import Title from './components/Title';
import Description from './components/Description';

import logo from 'assets/images/logo_128c.png';
import type { Props } from './components/Logo/types';

export default Logo;

export {
  LogoSize,
  Image,
  Title,
  Description,
};

export const FBXLogo = (
  (props: Props): JSX.Element => (
    <Logo {...props}>
      <Image image={logo} />
      <Title>feedbax</Title>
      <Description>by 365steps</Description>
    </Logo>
  )
);
