import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles } from 'lucide-react';

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

export const ToolboxSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Image Side */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 relative"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <img
                src="https://www.easyproject.com/EasyProject/media/images/articles/account-management/project-management-plugins-are-over-welcome-all-in-one-solutions.png"
                alt="All-in-one toolbox illustration"
                className="w-full h-auto max-w-lg mx-auto"
              />
            </motion.div>
            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-1/4 -left-8 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute bottom-1/4 -right-8 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2"
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6"
            >
              <Target className="w-4 h-4 mr-2" />
              All-In-One Solution
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Best Online All-In-One Toolbox
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-gray-600"
            >
              <p>
                10015.io brings all online tools together. If you got tired of bookmarking a single website for each online tool, you are in right place.
              </p>
              <p>
                10015.io has designed as simple as possible to make it easier to focus on functionality of the tool. Main aim of the tools is to perform the operation in minimum steps with a clear UI/UX.
              </p>
              <p>
                Start to use 10015.io and forget all other tools you use forever.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Tools
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};