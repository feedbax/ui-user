import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Container from 'components/Container';

import { motionProps, fallback, backgrounds } from './vars';
import type { RouteProps } from './types';

const RouteContent = ({ route }: RouteProps): JSX.Element => (
  <motion.div key={route.key} {...motionProps}>
    <Suspense fallback={fallback}>
      <Container styles={route.styles} {...backgrounds}>
        <route.component />
      </Container>
    </Suspense>
  </motion.div>
);

export default React.memo(RouteContent);
