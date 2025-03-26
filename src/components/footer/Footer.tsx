import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart, Coffee, Mailbox as Toolbox, ExternalLink, LogIn } from 'lucide-react';

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

const linkHoverVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <Toolbox className="w-8 h-8 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">Magic Tool</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Your all-in-one toolbox for developers and designers. Making everyday tasks simpler and more efficient.
            </p>
            <motion.div 
              className="flex items-center gap-4 pt-4"
              variants={containerVariants}
            >
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  variants={linkHoverVariants}
                  whileHover="hover"
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <social.icon className="w-5 h-5 text-gray-600 hover:text-indigo-600 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Tools', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Support', path: '/support' },
                { name: 'Sign In', path: '/sign-in', icon: LogIn }
              ].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    to={item.path}
                    className="text-gray-600 hover:text-indigo-600 text-sm flex items-center gap-2"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Cookie Policy', path: '/privacy#cookies' },
                { name: 'Security', path: '/privacy#security' }
              ].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    to={item.path}
                    className="text-gray-600 hover:text-indigo-600 text-sm flex items-center gap-1"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-gray-600">Subscribe to our newsletter for updates and new features.</p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-200 py-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>© {currentYear} Magic Tool.</span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500" /> by developers for developers
              </span>
            </div>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors duration-200"
            >
              <Coffee className="w-4 h-4" />
              <span className="text-sm font-medium">Buy us a coffee</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;