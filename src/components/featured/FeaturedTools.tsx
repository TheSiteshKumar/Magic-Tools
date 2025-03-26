import React from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ImageIcon, 
  Type, 
  PaintBucket, 
  Code2, 
  FileJson, 
  Wand2 
} from 'lucide-react';

const tools = [
  {
    icon: ImageIcon,
    name: "Image Optimizer",
    description: "Compress and optimize images without quality loss",
    category: "Image",
    isNew: true
  },
  {
    icon: Type,
    name: "Text Formatter",
    description: "Format and beautify text with a single click",
    category: "Text",
    isPopular: true
  },
  {
    icon: PaintBucket,
    name: "Color Extractor",
    description: "Extract color palettes from images instantly",
    category: "Color",
    isNew: true
  },
  {
    icon: Code2,
    name: "Code Beautifier",
    description: "Format and prettify code in various languages",
    category: "Code",
    isPopular: true
  },
  {
    icon: FileJson,
    name: "JSON Validator",
    description: "Validate and format JSON data structures",
    category: "Code",
    isNew: false
  },
  {
    icon: Wand2,
    name: "SVG Optimizer",
    description: "Optimize SVG files for better performance",
    category: "Image",
    isPopular: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
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
      damping: 10,
      mass: 0.5
    }
  }
};

const iconVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.15,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const buttonVariants = {
  initial: { x: 0 },
  hover: { 
    x: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

export const FeaturedTools = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={isInView ? { scale: 1 } : { scale: 0.95 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Tools
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-4 rounded-full" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most popular tools that help thousands of developers and designers streamline their workflow.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }
              }}
              className="relative group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                    className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors duration-300"
                  >
                    <tool.icon className="w-6 h-6 text-indigo-600" />
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    {tool.isNew && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        New
                      </motion.span>
                    )}
                    {tool.isPopular && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                      >
                        Popular
                      </motion.span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {tool.description}
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition-colors duration-300">
                      {tool.category}
                    </span>
                    <motion.button
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
                    >
                      Try Now →
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};