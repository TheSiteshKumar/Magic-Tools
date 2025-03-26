import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};

export const HeroIllustration = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative w-full h-full flex items-center justify-center"
    >
      <img
        src="https://mechlintech.com/wp-content/uploads/2021/11/MVP.svg"
        alt="MVP Illustration"
        className="w-full max-w-[500px] h-auto"
      />
    </motion.div>
  );
};
