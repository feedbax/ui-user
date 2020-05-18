import React from 'react';
import { Helmet } from 'react-helmet';

import privacyPolicy from 'assets/markdown/PRIVACY_POLICY.md';
import Markdown from '../Markdown';

const PrivacyPolicy = (): JSX.Element => (
  <Markdown
    markdownPath={privacyPolicy}
    helmet={(
      <Helmet>
        <title>feedbax | Datenschutz &amp; Impressum</title>
      </Helmet>
    )}
  />
);

export default React.memo(PrivacyPolicy);
