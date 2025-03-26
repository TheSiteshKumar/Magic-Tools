import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Type, 
  Image, 
  Palette, 
  Code, 
  Search,
  Sparkles,
  Grid
} from 'lucide-react';

const categories = [
  { 
    name: 'Text Tools',
    path: '/tools/text',
    icon: Type,
  },
  { 
    name: 'Image Tools',
    path: '/tools/image',
    icon: Image,
  },
  { 
    name: 'Design Tools',
    path: '/tools/design',
    icon: Palette,
  },
  { 
    name: 'Developer Tools',
    path: '/tools/dev',
    icon: Code,
  }
];

const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  }
};

const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export const NavLinks = () => {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="hidden md:flex items-center space-x-8"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative group"
      >
        <Link 
          to="/tools" 
          className="flex items-center space-x-2 text-base font-medium text-gray-700 hover:text-indigo-600"
        >
          <Search className="h-4 w-4" />
          <span>Tool Finder</span>
          <span className="flex items-center px-1.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-600 rounded">
            <Sparkles className="h-3 w-3 mr-1" />
            BETA
          </span>
        </Link>
      </motion.div>

      <div
        onMouseEnter={() => setActiveDropdown('categories')}
        onMouseLeave={() => setActiveDropdown(null)}
        className="relative"
      >
        <button className="flex items-center space-x-2 text-base font-medium text-gray-700 hover:text-indigo-600 transition-colors">
          <Grid className="h-4 w-4" />
          <span>Categories</span>
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              activeDropdown === 'categories' ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate={activeDropdown === 'categories' ? "visible" : "hidden"}
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          {categories.map((category) => (
            <motion.div 
              key={category.path} 
              whileHover={{ x: 5 }}
              className="px-1"
            >
              <Link
                to={category.path}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              >
                <category.icon className="h-5 w-5 mr-2 text-indigo-600" />
                <span className="font-medium">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};