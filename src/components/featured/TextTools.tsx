import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Type, 
  Hash, 
  AlignLeft, 
  Braces, 
  FileJson, 
  Quote, 
  Regex 
} from 'lucide-react';

const textTools = [
  {
    name: 'Text Case Converter',
    icon: Type,
    description: 'Convert text between different cases',
    tag: 'Popular',
    tagColor: 'bg-amber-100 text-amber-800'
  },
  {
    name: 'Lorem Ipsum Generator',
    icon: FileText,
    description: 'Generate placeholder text for designs',
    tag: 'New',
    tagColor: 'bg-green-100 text-green-800'
  },
  {
    name: 'Word Counter',
    icon: Hash,
    description: 'Generate MD5, SHA-1, and other hashes',
    tag: 'Popular',
    tagColor: 'bg-amber-100 text-amber-800'
  },
  {
    name: 'Text Formatter',
    icon: AlignLeft,
    description: 'Format and beautify text content',
    tag: 'Featured',
    tagColor: 'bg-purple-100 text-purple-800'
  },
  {
    name: 'JSON Formatter',
    icon: Braces,
    description: 'Format and validate JSON data',
    tag: 'Popular',
    tagColor: 'bg-amber-100 text-amber-800'
  },
  {
    name: 'Markdown Editor',
    icon: FileJson,
    description: 'Edit and preview markdown in real-time',
    tag: 'New',
    tagColor: 'bg-green-100 text-green-800'
  },
  {
    name: 'Quote Generator',
    icon: Quote,
    description: 'Generate random inspiring quotes',
    tag: 'Fun',
    tagColor: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Regex Tester',
    icon: Regex,
    description: 'Test and validate regular expressions',
    tag: 'Advanced',
    tagColor: 'bg-indigo-100 text-indigo-800'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const glowVariants = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  hover: {
    opacity: 1,
    scale: 1.2,
    transition: {
      duration: 0.3
    }
  }
};

export const TextTools = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
            <Type className="w-4 h-4 mr-2" />
            Text Tools
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Transform Your Text
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful text manipulation tools to help you format, convert, and analyze text with ease
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {textTools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="relative z-10 h-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="p-3 bg-pink-50 rounded-xl text-pink-500"
                  >
                    <tool.icon className="w-6 h-6" />
                  </motion.div>
                  <span className={`${tool.tagColor} px-2 py-1 rounded-full text-xs font-medium`}>
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {tool.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center"
                >
                  Try Now
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
              <motion.div
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 rounded-2xl blur-xl"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};