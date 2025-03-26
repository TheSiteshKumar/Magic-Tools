import React from 'react';
import { motion } from 'framer-motion';

export const Privacy = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-indigo max-w-none"
        >
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: March 15, 2024</p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, information we obtain automatically when you use our Service, and information from third party sources.
          </p>

          <h2 id="security">2. Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, or unauthorized disclosure or access.
          </p>

          <h2>3. Data Usage</h2>
          <p>
            We use the information we collect to operate and improve our Service, communicate with you, and for research and analytics.
          </p>

          <h2 id="cookies">4. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            Our Service may contain links to third-party websites or services that are not owned or controlled by Magic Tool.
          </p>

          <h2>6. Children's Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.
          </p>

          <h2>7. Changes to Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@magictool.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
};