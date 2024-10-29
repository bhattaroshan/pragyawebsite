import React from 'react';
import { motion } from 'framer-motion';

const FramerMotionLoader = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-16 h-16 border-t-4 border-gray-500 rounded-full"
        animate={{
          rotate: 360,
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      <motion.div
        className="absolute text-gray-500 font-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: [0, 1, 0],
          y: [10, 0, 10],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
};

export default FramerMotionLoader;