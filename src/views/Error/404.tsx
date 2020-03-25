import React from 'react';
import Helmet from 'react-helmet';

const Error = (): JSX.Element => (
  <>
    <Helmet>
      <title>404</title>
    </Helmet>

    <div>OOOOOOPS!!!!! NOT FOUNDDD!!!!!</div>
  </>
);

export default Error;
