import React from 'react';
import { motion } from 'framer-motion';
import { Type, Image, Palette, Code, Paintbrush, Share2, Settings, FileText, ImagePlus, Shapes, Terminal, Droplets, Share, PenTool as Tool } from 'lucide-react';

const categories = [
  { 
    name: 'Text Tools',
    icon: Type,
    description: 'Format, convert, and analyze text',
    color: 'from-pink-500/10 to-rose-500/10',
    hoverColor: 'hover:from-pink-500/20 hover:to-rose-500/20',
    iconColor: 'text-pink-500'
  },
  { 
    name: 'Image Tools',
    icon: Image,
    description: 'Edit, compress, and convert images',
    color: 'from-blue-500/10 to-cyan-500/10',
    hoverColor: 'hover:from-blue-500/20 hover:to-cyan-500/20',
    iconColor: 'text-blue-500'
  },
  { 
    name: 'CSS Tools',
    icon: Palette,
    description: 'Generate and optimize CSS styles',
    color: 'from-purple-500/10 to-violet-500/10',
    hoverColor: 'hover:from-purple-500/20 hover:to-violet-500/20',
    iconColor: 'text-purple-500'
  },
  { 
    name: 'Coding Tools',
    icon: Code,
    description: 'Format, minify, and validate code',
    color: 'from-green-500/10 to-emerald-500/10',
    hoverColor: 'hover:from-green-500/20 hover:to-emerald-500/20',
    iconColor: 'text-green-500'
  },
  { 
    name: 'Color Tools',
    icon: Paintbrush,
    description: 'Generate and convert color schemes',
    color: 'from-yellow-500/10 to-amber-500/10',
    hoverColor: 'hover:from-yellow-500/20 hover:to-amber-500/20',
    iconColor: 'text-yellow-600'
  },
  { 
    name: 'Social Media Tools',
    icon: Share2,
    description: 'Create and optimize social content',
    color: 'from-red-500/10 to-orange-500/10',
    hoverColor: 'hover:from-red-500/20 hover:to-orange-500/20',
    iconColor: 'text-red-500'
  },
  { 
    name: 'Developer Tools',
    icon: Terminal,
    description: 'Essential tools for developers',
    color: 'from-indigo-500/10 to-blue-500/10',
    hoverColor: 'hover:from-indigo-500/20 hover:to-blue-500/20',
    iconColor: 'text-indigo-500'
  },
  { 
    name: 'Design Tools',
    icon: Shapes,
    description: 'Create and edit design assets',
    color: 'from-teal-500/10 to-emerald-500/10',
    hoverColor: 'hover:from-teal-500/20 hover:to-emerald-500/20',
    iconColor: 'text-teal-500'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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
      damping: 10
    }
  }
};

const iconVariants = {
  initial: { 
    scale: 1,
    rotate: 0
  },
  hover: { 
    scale: 1.2,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

export const ToolsCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Our Tools
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-4 rounded-full" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive collection of tools designed to streamline your workflow
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }
              }}
              className={`relative group rounded-2xl p-6 bg-gradient-to-r ${category.color} ${category.hoverColor} transition-all duration-300 cursor-pointer`}
            >
              <div className="relative z-10">
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white ${category.iconColor} mb-4`}
                >
                  <category.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.description}
                </p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-2xl"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};