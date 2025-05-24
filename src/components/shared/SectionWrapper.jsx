
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const SectionWrapper = ({ children, id, className, disableAnimation = false, ...props }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
  };

  if (disableAnimation) {
    return (
      <section
        id={id}
        className={`section-padding ${className || ''}`}
        {...props}
      >
        <div className="container-custom">
          {children}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className={`section-padding ${className || ''}`}
      {...props}
    >
      <div className="container-custom">
        {children}
      </div>
    </motion.section>
  );
};

export const MotionCard = motion(Card);
export const MotionDiv = motion.div;

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99], staggerChildren: 0.1 } 
  }
};

export const itemVariantsRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.1, staggerChildren: 0.1 } 
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};


export default SectionWrapper;
