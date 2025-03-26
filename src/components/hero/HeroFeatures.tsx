import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const HeroFeatures = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mt-16"
    >
      <motion.p variants={item} className="text-gray-500 text-center mb-6 text-sm">
        Trusted by developers at:
      </motion.p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {[24, 28, 20, 24, 28].map((width, index) => (
          <motion.div
            key={index}
            variants={item}
            className={`h-6 w-${width} bg-gray-200 rounded animate-pulse`}
          />
        ))}
      </div>
    </motion.div>
  );
};