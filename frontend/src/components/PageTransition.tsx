import { motion, type Variants, type Transition } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition: Transition = {
  duration: 0.65,
  ease: [0.4, 0, 0.2, 1], // smooth material curve
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;