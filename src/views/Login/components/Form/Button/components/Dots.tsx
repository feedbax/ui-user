import React from 'react';
import styled from 'styled-components';

import Dot from './Dot';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Dots = (): JSX.Element => (
  <Container>
    <Dot delay="0ms" />
    <Dot delay="100ms" />
    <Dot delay="200ms" />
  </Container>
);

export default React.memo(Dots);
