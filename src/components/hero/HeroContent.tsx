import React from 'react';
import { motion } from 'framer-motion';
import { Search, Chrome, ArrowRight, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const buttonHover = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};

export const HeroContent = () => {
  return (
    <motion.div variants={fadeUp} className="relative">
      <motion.div
        variants={fadeUp}
        className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-full mb-4 text-sm"
      >
        <Zap className="w-4 h-4 mr-1.5" />
        <span>Now with AI-powered search</span>
      </motion.div>
      
      <motion.h1
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
      >
        All Online Tools in{' '}
        <span className="relative inline-block">
          "One Box"
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-1 left-0 h-2 bg-indigo-200/60 -z-10"
          ></motion.div>
        </span>
      </motion.h1>
      
      <motion.div variants={fadeUp} className="mt-4">
        <p className="text-base text-gray-600">
          Magic Tool is your free all-in-one toolbox solution designed to
          simplify workflows and eliminate bookmark clutter.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
        <motion.button
          whileHover={buttonHover}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
        >
          Explore Tools
          <ArrowRight className="w-4 h-4 ml-2" />
        </motion.button>
        
        <motion.button
          whileHover={buttonHover}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all"
        >
          <Search className="w-4 h-4 mr-2" />
          MagicTool Finder
        </motion.button>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8">
        <p className="text-gray-600 mb-3 text-sm">
          Get instant access with browser extension:
        </p>
        <motion.button
          whileHover={buttonHover}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all text-sm"
        >
          <Chrome className="w-4 h-4 mr-2" />
          <div className="text-left">
            <span className="block text-xs text-gray-500">Add to Chrome</span>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};