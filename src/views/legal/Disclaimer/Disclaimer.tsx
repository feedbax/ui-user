import React from 'react';
import { Helmet } from 'react-helmet';

import disclaimer from 'assets/markdown/DISCLAIMER.md';
import Markdown from '../Markdown';

const Disclaimer = (): JSX.Element => (
  <Markdown
    markdownPath={disclaimer}
    helmet={(
      <Helmet>
        <title>feedbax | OSS-Lizenzen</title>
      </Helmet>
    )}
  />
);

export default React.memo(Disclaimer);
