import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Coffee, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

interface UserActionsProps {
  onMobileMenuToggle: () => void;
}

export const UserActions: React.FC<UserActionsProps> = ({ onMobileMenuToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex items-center space-x-4"
    >
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="p-2 text-gray-400 hover:text-indigo-600"
      >
        <Coffee className="h-6 w-6" />
      </motion.button>

      {/* Mobile Menu Toggle */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onMobileMenuToggle}
        className="p-2 text-gray-400 hover:text-indigo-600 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </motion.button>

      {/* Desktop Sign In Button */}
      <Link
        to="/sign-in"
        className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign in
      </Link>
    </motion.div>
  );
};