import React from 'react';
import { motion } from 'framer-motion';
import { HeroContent } from './HeroContent';
import { HeroIllustration } from './HeroIllustration';
import { HeroFeatures } from './HeroFeatures';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

export const Hero = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <HeroContent />
          <HeroIllustration />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroFeatures />
      </div>
    </motion.div>
  );
};