import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Sparkles, Star } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const sparkleVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1, 0],
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  }
};

export const SupportSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/4 left-1/4 text-amber-400"
      >
        <Star className="w-4 h-4" />
      </motion.div>
      <motion.div
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-1/4 right-1/4 text-amber-400"
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="flex-1 md:max-w-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white"
              >
                <Coffee className="w-6 h-6" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900">
                Support Our Work
              </h2>
            </div>
            <p className="text-base text-gray-600">
              If you find our tools helpful, consider buying us a coffee. Your support helps us maintain and improve these tools!
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-shrink-0"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Buy me a coffee
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut"
                }}
                className="absolute -right-1 -top-1"
              >
                <Heart className="w-3 h-3 text-red-500 fill-current" />
              </motion.span>
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-8 md:gap-12"
          >
            {[
              { count: '1,234', label: 'Supporters' },
              { count: '2,345', label: 'Coffees' },
              { count: '$12,345', label: 'Total' }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2 }}
                className="text-center"
              >
                <div className="text-xl font-bold text-gray-900">{stat.count}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};