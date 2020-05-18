import React from 'react';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';
import { fontFamily } from 'assets/styles/theme';

import errorImage from 'assets/images/undraw_access_denied.svg';

import { FBXLogo } from 'components/Logo';
import { FBXFooter } from 'components/Footer';

const ErrorImage = styled.img`
  flex: 0 0 auto;
  display: block;
  position: relative;
  max-width: 50%;
  margin-bottom: 25px;
`;

const ErrorText = styled.p`
  text-align: center;
  font-family: ${fontFamily('primary')};
  font-size: 18px;
  padding: 0 25px;
`;

const Error = (): JSX.Element => (
  <>
    <Helmet>
      <title>feedbax | Ups.. Diese Seite existiert nicht!</title>
    </Helmet>

    <FBXLogo link="/" margin={['0 0 50px 0', '0 0 60px 0', '0 0 70px 0']} />

    <ErrorImage src={errorImage} alt="error" />
    <ErrorText>Hier ist wohl was schief gelaufen.. Diese Seite existiert nicht.</ErrorText>

    <FBXFooter $color="primary" />
  </>
);

export default Error;
