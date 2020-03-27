import React from 'react';
import { motion } from 'framer-motion';

import Dots from './Dots';

const MotionDots = (): JSX.Element => (
  <motion.div
    key="dots"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Dots />
  </motion.div>
);

export default React.memo(MotionDots);
