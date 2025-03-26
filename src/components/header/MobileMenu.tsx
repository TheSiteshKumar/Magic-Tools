import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  X, 
  Search, 
  Grid, 
  ChevronDown, 
  Type, 
  Image, 
  Palette, 
  Code,
  LogIn,
  Sparkles
} from 'lucide-react';

const categories = [
  { 
    name: 'Text Tools',
    path: '/tools/text',
    icon: Type,
    subItems: [
      { name: 'Text Case Converter', path: '/tools/text/case-converter' },
      { name: 'Lorem Ipsum Generator', path: '/tools/text/lorem-ipsum' },
      { name: 'String Hash Generator', path: '/tools/text/hash' },
      { name: 'Markdown Editor', path: '/tools/text/markdown' }
    ]
  },
  { 
    name: 'Image Tools',
    path: '/tools/image',
    icon: Image,
    subItems: [
      { name: 'Image Optimizer', path: '/tools/image/optimizer' },
      { name: 'Image Converter', path: '/tools/image/converter' },
      { name: 'Color Extractor', path: '/tools/image/color-extract' }
    ]
  },
  { 
    name: 'CSS Tools',
    path: '/tools/css',
    icon: Palette,
    subItems: [
      { name: 'Gradient Generator', path: '/tools/css/gradient' },
      { name: 'Flexbox Generator', path: '/tools/css/flexbox' },
      { name: 'Grid Generator', path: '/tools/css/grid' }
    ]
  },
  { 
    name: 'Code Tools',
    path: '/tools/code',
    icon: Code,
    subItems: [
      { name: 'Code Formatter', path: '/tools/code/formatter' },
      { name: 'Minifier', path: '/tools/code/minifier' },
      { name: 'JSON Validator', path: '/tools/code/json' }
    ]
  }
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 }
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Tool Finder */}
              <Link
                to="/search"
                onClick={onClose}
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Tool Finder</span>
                <span className="flex items-center px-1.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-600 rounded">
                  <Sparkles className="h-3 w-3 mr-1" />
                  BETA
                </span>
              </Link>

              {/* Categories Accordion */}
              <div className="space-y-2">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === 'categories' ? null : 'categories')}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Grid className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Categories</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                      expandedCategory === 'categories' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {expandedCategory === 'categories' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {categories.map((category) => (
                          <div key={category.path} className="space-y-1">
                            <Link
                              to={category.path}
                              onClick={onClose}
                              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <category.icon className="w-4 h-4 text-gray-600" />
                              <span className="text-base text-gray-900">{category.name}</span>
                            </Link>
                            {category.subItems && (
                              <div className="pl-6 space-y-1">
                                {category.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    onClick={onClose}
                                    className="flex items-center space-x-2 p-2 text-sm text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-50"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sign In Button */}
              <Link
                to="/sign-in"
                onClick={onClose}
                className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Sign In</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};