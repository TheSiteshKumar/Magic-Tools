import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Shield, Zap } from 'lucide-react';

export const About = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Magic Tool</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're on a mission to simplify developers' and designers' workflows with powerful, easy-to-use tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600">
              Magic Tool started with a simple idea: what if we could bring all the essential development and design tools together in one place? Our team of passionate developers and designers worked tirelessly to create a platform that would make everyday tasks easier and more efficient.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of users worldwide, helping them streamline their workflows and focus on what matters most - creating amazing products.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Users, title: "Community First", description: "We build for and with our community" },
                { icon: Target, title: "Simplicity", description: "Making complex tools easy to use" },
                { icon: Shield, title: "Privacy", description: "Your data security is our priority" },
                { icon: Zap, title: "Performance", description: "Fast, reliable tools that work when you need them" }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <value.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};