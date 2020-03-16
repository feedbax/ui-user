import React from 'react';
import { motion } from 'framer-motion';

const MotionLabel = ({ label }: { label: string }): JSX.Element => (
  <motion.div
    key="label"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {label}
  </motion.div>
);

export default MotionLabel;
