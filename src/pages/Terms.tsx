import React from 'react';
import { motion } from 'framer-motion';

export const Terms = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-indigo max-w-none"
        >
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: March 15, 2024</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Magic Tool, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Magic Tool's website for personal, non-commercial transitory viewing only.
          </p>

          <h2>3. User Account</h2>
          <p>
            To access certain features of the Service, you must register for an account. You must provide accurate and complete information and keep your account information updated.
          </p>

          <h2>4. Fair Usage</h2>
          <p>
            You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks.
          </p>

          <h2>5. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use and disclose information about you.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@magictool.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
};