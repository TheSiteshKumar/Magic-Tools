import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Coffee, Users } from 'lucide-react';
import { SupportSection } from '../components/support/SupportSection';

export const Support = () => {
  return (
    <>
      <div className="py-16 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help?</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get the support you need. We're here to help you make the most of Magic Tool.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: FileText,
                title: "Documentation",
                description: "Browse our detailed documentation and guides",
                link: "#"
              },
              {
                icon: MessageSquare,
                title: "Live Chat",
                description: "Get instant help from our support team",
                link: "#"
              },
              {
                icon: Users,
                title: "Community",
                description: "Join our community forum for discussions",
                link: "#"
              },
              {
                icon: Coffee,
                title: "Developer Support",
                description: "Premium support for business users",
                link: "#"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <motion.a
                    href={item.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-indigo-600 font-medium hover:text-indigo-700"
                  >
                    Learn more →
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <SupportSection />
    </>
  );
};